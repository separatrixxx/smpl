import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/shared/utils/prisma/prismaClient';
import { loggerError } from '@/shared/utils/logger/logger';
import { withLogging } from '@/shared/utils/logger/withLogging';
import { withDbTiming } from '@/shared/utils/logger/withDbTiming';


interface RouteParams {
    params: Promise<{ id: string }>;
}

export const GET = withLogging(async (req: NextRequest, { params }: RouteParams) => {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    try {
        const project = await withDbTiming('project.findUnique', () =>
            db.project.findUnique(id)
        );

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter((t) => t.type === 'done').length;

        const formattedProject = {
            id: project.id,
            workspace_id: project.workspace_id,
            title: project.title,
            description: project.description,
            is_starred: project.is_starred,
            tasks_count: totalTasks,
            progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        };

        return NextResponse.json(formattedProject);
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});

export const PUT = withLogging(async (req: NextRequest, { params }: RouteParams) => {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    try {
        const body = await req.json();

        const project = await withDbTiming('project.update', () =>
            db.project.update(id, {
                title: body.title,
                description: body.description,
                is_starred: body.is_starred,
            })
        );

        return NextResponse.json(project);
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});

export const DELETE = withLogging(async (req: NextRequest, { params }: RouteParams) => {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    try {
        await withDbTiming('project.delete', () =>
            db.project.delete(id)
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
