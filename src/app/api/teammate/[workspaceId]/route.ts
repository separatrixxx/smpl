import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/shared/utils/prisma/prismaClient';
import { loggerError } from '@/shared/utils/logger/logger';
import { withLogging } from '@/shared/utils/logger/withLogging';
import { withDbTiming } from '@/shared/utils/logger/withDbTiming';


interface RouteParams {
    params: Promise<{ workspaceId: string }>;
}

export const GET = withLogging(async (req: NextRequest, { params }: RouteParams) => {
    const { workspaceId: workspaceIdParam } = await params;
    const workspaceId = Number(workspaceIdParam);

    if (isNaN(workspaceId)) {
        return NextResponse.json({ error: 'Invalid workspaceId' }, { status: 400 });
    }

    try {
        const userWorkspaces = await withDbTiming('userWorkspace.findByWorkspace', () =>
            db.userWorkspace.findByWorkspace(workspaceId)
        );

        const teammates = userWorkspaces.map((uw) => ({
            id: uw.user.id,
            first_name: uw.user.first_name,
            last_name: uw.user.last_name,
            username: uw.user.username,
            photo_url: uw.user.photo_url,
        }));

        return NextResponse.json({
            workspaceId: workspaceId,
            teammates: teammates,
        });
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
