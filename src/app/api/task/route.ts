import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/utils/prisma/prismaClient";
import { TaskStatus } from "@/generated/prisma";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.title || typeof body.title !== 'string') {
            return NextResponse.json(
                { error: "title is required and must be a string" },
                { status: 400 }
            );
        }

        if (!body.workspace_id || typeof body.workspace_id !== 'number') {
            return NextResponse.json(
                { error: "workspace_id is required and must be a number" },
                { status: 400 }
            );
        }

        if (!body.date || typeof body.date !== 'string') {
            return NextResponse.json(
                { error: "date is required and must be a string" },
                { status: 400 }
            );
        }

        const task = await db.task.create({
            workspace_id: body.workspace_id,
            project_id: body.project_id ?? null,
            title: body.title,
            is_starred: body.is_starred ?? false,
            priority: body.priority ?? 1,
            date: new Date(body.date),
            status: body.status ?? 'todo',
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get('workspace');
        const projectId = searchParams.get('project');
        const telegramId = searchParams.get('userId');

        if (projectId === 'my' && telegramId) {
            const user = await db.user.findByTelegramId(BigInt(telegramId));

            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            const tasks = await db.task.findByUser(user.id, TaskStatus.review);

            const formattedTasks = tasks.map((task) => ({
                id: task.id,
                title: task.title,
                is_starred: task.is_starred,
                priority: task.priority,
                date: task.date.toISOString(),
                type: task.status,
            }));

            return NextResponse.json({ review: formattedTasks });
        }

        if (workspaceId) {
            const tasks = await db.task.findByWorkspace(
                Number(workspaceId),
                projectId ? Number(projectId) : undefined
            );

            type FormattedTask = {
                id: number;
                title: string;
                is_starred: boolean;
                priority: number;
                date: string;
                type: TaskStatus;
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
                    type: task.status,
                };

                groupedTasks[task.status].push(formatted);
            });

            return NextResponse.json(groupedTasks);
        }

        const tasks = await db.task.findMany();

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
