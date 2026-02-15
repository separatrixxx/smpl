import { NextRequest, NextResponse } from 'next/server';
import { loggerInfoCtx, loggerWarnCtx, loggerErrorCtx } from './logger';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiHandler = (req: NextRequest, context: any) => Promise<NextResponse>;

export const withLogging = (handler: ApiHandler): ApiHandler => {
    return async (req: NextRequest, context: unknown) => {
        const start = performance.now();
        const method = req.method;
        const url = new URL(req.url);
        const path = url.pathname;
        const search = url.search;

        try {
            const response = await handler(req, context);
            const duration = Math.round(performance.now() - start);
            const status = response.status;

            const logFn = status >= 400 ? loggerWarnCtx : loggerInfoCtx;
            
            logFn(
                { method, path, search, status, duration_ms: duration },
                'API request completed'
            );

            return response;
        } catch (error) {
            const duration = Math.round(performance.now() - start);

            loggerErrorCtx(
                { method, path, search, duration_ms: duration, error: String(error) },
                'API request failed'
            );

            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    };
};
