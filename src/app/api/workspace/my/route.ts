import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/shared/utils/prisma/prismaClient';
import { TaskType } from '@/generated/prisma';
import { loggerError } from '@/shared/utils/logger/logger';
import { withLogging } from '@/shared/utils/logger/withLogging';
import { withDbTiming } from '@/shared/utils/logger/withDbTiming';


export const GET = withLogging(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const telegramId = searchParams.get('userId');

    if (!telegramId) {
        return NextResponse.json(
            { error: 'userId (telegramId) is required' },
            { status: 400 }
        );
    }

    try {
        const user = await withDbTiming('user.findByTelegramId', () =>
            db.user.findByTelegramId(BigInt(telegramId))
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const workspace = await withDbTiming('workspace.findMyWorkspace', () =>
            db.workspace.findMyWorkspace(user.id)
        );

        if (!workspace) {
            return NextResponse.json(
                { error: 'My workspace not found' },
                { status: 404 }
            );
        }

        const totalTasks = workspace.tasks.length;
        const completedTasks = workspace.tasks.filter(
            (task) => task.type === TaskType.done
        ).length;

        return NextResponse.json({
            id: workspace.id,
            title: workspace.title,
            description: workspace.description,
            is_my_workspace: workspace.is_my_workspace,
            tasks_info: {
                total: totalTasks,
                completed: completedTasks,
            },
            teammates: workspace.teammates.map((t) => t.user_id),
        });
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
