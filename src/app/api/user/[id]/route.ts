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
        const user = await withDbTiming('user.findUnique', () =>
            db.user.findUnique(id)
        );

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        loggerError('Database error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
});
