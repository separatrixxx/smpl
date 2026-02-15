import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/shared/utils/prisma/prismaClient';
import { TaskType } from '@/generated/prisma';
import {
    generateMyWorkspaceSerial,
    generateProjectSerial,
} from '@/entities/tasks/utils/generateTaskSerial';
import { loggerError } from '@/shared/utils/logger/logger';
import { withLogging } from '@/shared/utils/logger/withLogging';
import { withDbTiming } from '@/shared/utils/logger/withDbTiming';


export const POST = withLogging(async (req: NextRequest) => {
    try {
        const body = await req.json();

        if (!body.title || typeof body.title !== 'string') {
            return NextResponse.json(
                { error: 'title is required and must be a string' },
                { status: 400 }
            );
        }

        if (!body.workspace_id || typeof body.workspace_id !== 'number') {
            return NextResponse.json(
                { error: 'workspace_id is required and must be a number' },
                { status: 400 }
            );
        }

        if (!body.date || typeof body.date !== 'string') {
            return NextResponse.json(
                { error: 'date is required and must be a string' },
                { status: 400 }
            );
        }

        let serial: string;

        if (body.project_id) {
            const project = await withDbTiming('project.findUnique', () =>
                db.project.findUnique(body.project_id)
            );

            if (!project) {
                return NextResponse.json(
                    { error: 'Project not found' },
                    { status: 404 }
                );
            }

            const taskCount = await withDbTiming('task.countByProject', () =>
                db.task.countByProject(body.project_id)
            );

            serial = generateProjectSerial({
                projectAlias: project.alias,
                taskNumber: taskCount + 1,
            });
        } else {
            if (!body.telegram_id) {
                return NextResponse.json(
                    { error: 'telegram_id is required for my workspace tasks' },
                    { status: 400 }
                );
            }

            const user = await withDbTiming('user.findByTelegramId', () =>
                db.user.findByTelegramId(BigInt(body.telegram_id))
            );

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const taskCount = await withDbTiming('task.countByMyWorkspace', () =>
                db.task.countByMyWorkspace(user.id)
            );

            serial = generateMyWorkspaceSerial({
                username: user.username,
                telegramId: body.telegram_id,
                taskNumber: taskCount + 1,
            });
        }

        const task = await withDbTiming('task.create', () =>
            db.task.create({
                workspace_id: body.workspace_id,
                project_id: body.project_id ?? null,
                title: body.title,
                is_starred: body.is_starred ?? false,
                priority: body.priority ?? 1,
                date: new Date(body.date),
                type: body.type ?? 'todo',
                serial,
            })
        );

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});

export const GET = withLogging(async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get('workspace');
        const projectId = searchParams.get('project');
        const telegramId = searchParams.get('userId');

        if (projectId === 'my' && telegramId) {
            const user = await withDbTiming('user.findByTelegramId', () =>
                db.user.findByTelegramId(BigInt(telegramId))
            );

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const myWorkspace = await withDbTiming('workspace.findMyWorkspaceId', () =>
                db.workspace.findMyWorkspaceId(user.id)
            );

            if (!myWorkspace) {
                return NextResponse.json(
                    { error: 'My workspace not found' },
                    { status: 404 }
                );
            }

            const tasks = await withDbTiming('task.findByUser', () =>
                db.task.findByUser(user.id)
            );

            type FormattedTask = {
                id: number;
                title: string;
                is_starred: boolean;
                priority: number;
                date: string;
                type: TaskType;
                serial: string;
            };

            const groupedTasks: {
                workspace_id: number;
                todo: FormattedTask[];
                progress: FormattedTask[];
                review: FormattedTask[];
                done: FormattedTask[];
            } = {
                workspace_id: myWorkspace.id,
                todo: [],
                progress: [],
                review: [],
                done: [],
            };

            tasks.forEach((task) => {
                const formatted: FormattedTask = {
                    id: task.id,
                    title: task.title,
                    is_starred: task.is_starred,
                    priority: task.priority,
                    date: task.date.toISOString(),
                    type: task.type,
                    serial: task.serial,
                };

                groupedTasks[task.type].push(formatted);
            });

            return NextResponse.json(groupedTasks);
        }

        if (workspaceId) {
            const tasks = await withDbTiming('task.findByWorkspace', () =>
                db.task.findByWorkspace(
                    Number(workspaceId),
                    projectId ? Number(projectId) : undefined
                )
            );

            type FormattedTask = {
                id: number;
                title: string;
                is_starred: boolean;
                priority: number;
                date: string;
                type: TaskType;
                serial: string;
            };

            const groupedTasks: {
                workspace_id: number;
                project_id: number | undefined;
                todo: FormattedTask[];
                progress: FormattedTask[];
                review: FormattedTask[];
                done: FormattedTask[];
            } = {
                workspace_id: Number(workspaceId),
                project_id: projectId ? Number(projectId) : undefined,
                todo: [],
                progress: [],
                review: [],
                done: [],
            };

            tasks.forEach((task) => {
                const formatted: FormattedTask = {
                    id: task.id,
                    title: task.title,
                    is_starred: task.is_starred,
                    priority: task.priority,
                    date: task.date.toISOString(),
                    type: task.type,
                    serial: task.serial,
                };

                groupedTasks[task.type].push(formatted);
            });

            return NextResponse.json(groupedTasks);
        }

        const tasks = await withDbTiming('task.findMany', () =>
            db.task.findMany()
        );

        return NextResponse.json(tasks);
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
