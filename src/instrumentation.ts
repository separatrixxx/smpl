export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { loggerInfoCtx, loggerWarnCtx } = await import('@/shared/utils/logger/logger');
        const { pool } = await import('@/shared/utils/prisma/prisma');

        loggerInfoCtx(
            { runtime: 'nodejs', node_version: process.version },
            'Instrumentation registered'
        );

        const start = performance.now();

        try {
            const client = await pool.connect();
            await client.query('SELECT 1');
            client.release();

            const duration = Math.round(performance.now() - start);

            loggerInfoCtx(
                { duration_ms: duration },
                'DB connection warmup completed'
            );
        } catch (error) {
            const duration = Math.round(performance.now() - start);

            loggerWarnCtx(
                { duration_ms: duration, error: String(error) },
                'DB connection warmup failed'
            );
        }
    }
}

export async function onRequestError(
    error: { digest: string } & Error,
    request: {
        path: string,
        method: string,
        headers: { [key: string]: string },
    },
    context: {
        routerKind: 'Pages Router' | 'App Router',
        routePath: string,
        routeType: 'render' | 'route' | 'action' | 'middleware',
        renderSource: 'react-server-components' | 'react-server-components-payload' | 'server-rendering',
        revalidateReason: 'on-demand' | 'stale' | undefined,
        renderType: 'dynamic' | 'dynamic-resume',
    }
) {
    const { loggerErrorCtx } = await import('@/shared/utils/logger/logger');

    loggerErrorCtx(
        {
            digest: error.digest,
            method: request.method,
            path: request.path,
            routePath: context.routePath,
            routeType: context.routeType,
            routerKind: context.routerKind,
        },
        `Unhandled error: ${error.message}`
    );
}
