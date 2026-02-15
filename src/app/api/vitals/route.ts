import { NextRequest, NextResponse } from 'next/server';
import { loggerInfoCtx, loggerWarnCtx } from '@/shared/utils/logger/logger';


const POOR_THRESHOLDS: Record<string, number> = {
    LCP: 2500,
    FCP: 1800,
    INP: 200,
    CLS: 0.1,
    TTFB: 800,
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, value, rating, attribution } = body;

        const threshold = POOR_THRESHOLDS[name];
        const isPoor = threshold !== undefined && value > threshold;
        const logFn = isPoor ? loggerWarnCtx : loggerInfoCtx;

        logFn(
            {
                metric: name,
                value: Math.round(name === 'CLS' ? value * 1000 : value),
                unit: name === 'CLS' ? 'shift_score_x1000' : 'ms',
                rating,
                ...attribution,
            },
            `Web Vital: ${name}`
        );

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
}
