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
        const task = await withDbTiming('task.findUnique', () =>
            db.task.findUnique(id)
        );

        if (!task) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }

        const formattedTask = {
            id: task.id,
            title: task.title,
            is_starred: task.is_starred,
            priority: task.priority,
            date: task.date.toISOString(),
            type: task.type,
        };

        return NextResponse.json(formattedTask);
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

        const task = await withDbTiming('task.update', () =>
            db.task.update(id, {
                title: body.title,
                is_starred: body.is_starred,
                priority: body.priority,
                date: body.date ? new Date(body.date) : undefined,
                type: body.type,
            })
        );

        return NextResponse.json(task);
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
        await withDbTiming('task.delete', () =>
            db.task.delete(id)
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
