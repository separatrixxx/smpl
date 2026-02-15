import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/shared/utils/prisma/prismaClient';
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

        if (!body.alias || typeof body.alias !== 'string') {
            return NextResponse.json(
                { error: 'alias is required and must be a string' },
                { status: 400 }
            );
        }

        const project = await withDbTiming('project.create', () =>
            db.project.create({
                workspace_id: body.workspace_id,
                title: body.title,
                description: body.description ?? null,
                is_starred: body.is_starred ?? false,
                alias: body.alias,
            })
        );

        return NextResponse.json(project, { status: 201 });
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

        if (workspaceId) {
            const projects = await withDbTiming('project.findByWorkspace', () =>
                db.project.findByWorkspace(Number(workspaceId))
            );

            const formattedProjects = projects.map((project) => {
                const totalTasks = project.tasks.length;
                const completedTasks = project.tasks.filter((t) => t.type === 'done').length;

                return {
                    id: project.id,
                    workspace_id: project.workspace_id,
                    title: project.title,
                    description: project.description,
                    is_starred: project.is_starred,
                    tasks_count: totalTasks,
                    progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
                    alias: project.alias,
                };
            });

            return NextResponse.json(formattedProjects);
        }

        const projects = await withDbTiming('project.findMany', () =>
            db.project.findMany()
        );

        return NextResponse.json(projects);
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
