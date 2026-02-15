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
        const workspace = await withDbTiming('workspace.findUnique', () =>
            db.workspace.findUnique(id)
        );

        if (!workspace) {
            return NextResponse.json(
                { error: 'Workspace not found' },
                { status: 404 }
            );
        }

        const formattedWorkspace = {
            id: workspace.id,
            title: workspace.title,
            description: workspace.description,
            is_my_workspace: workspace.is_my_workspace,
            owner: workspace.owner_id,
            teammates: workspace.teammates.map((t) => t.user_id),
            tasks_info: {
                completed: workspace.tasks.filter((t) => t.type === 'done').length,
                total: workspace.tasks.length,
            },
        };

        return NextResponse.json(formattedWorkspace);
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

        const workspace = await withDbTiming('workspace.update', () =>
            db.workspace.update(id, {
                title: body.title,
                description: body.description,
                is_my_workspace: body.is_my_workspace,
            })
        );

        return NextResponse.json(workspace);
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
        await withDbTiming('workspace.delete', () =>
            db.workspace.delete(id)
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
