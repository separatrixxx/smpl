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

        if (!body.owner_id || typeof body.owner_id !== 'number') {
            return NextResponse.json(
                { error: 'owner_id is required and must be a number' },
                { status: 400 }
            );
        }

        const workspace = await withDbTiming('workspace.create', () =>
            db.workspace.create({
                title: body.title,
                description: body.description ?? null,
                is_my_workspace: body.is_my_workspace ?? false,
                owner_id: body.owner_id,
            })
        );

        return NextResponse.json(workspace, { status: 201 });
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
        const telegramId = searchParams.get('userId');

        if (telegramId) {
            const user = await withDbTiming('user.findByTelegramId', () =>
                db.user.findByTelegramId(BigInt(telegramId))
            );

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            const workspaces = await withDbTiming('workspace.findByUser', () =>
                db.workspace.findByUser(user.id)
            );

            const formattedWorkspaces = workspaces.map((ws) => ({
                id: ws.id,
                title: ws.title,
                description: ws.description,
                is_my_workspace: ws.is_my_workspace,
                owner: ws.owner_id,
                teammates: ws.teammates.map((t) => t.user_id),
                tasks_info: {
                    completed: ws.tasks.filter((t) => t.type === 'done').length,
                    total: ws.tasks.length,
                },
            }));

            return NextResponse.json({
                telegramId: Number(telegramId),
                userId: user.id,
                workspaces: formattedWorkspaces,
            });
        }

        const workspaces = await withDbTiming('workspace.findMany', () =>
            db.workspace.findMany()
        );

        return NextResponse.json(workspaces);
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
