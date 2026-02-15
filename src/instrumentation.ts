export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { loggerInfoCtx } = await import('@/shared/utils/logger/logger');

        loggerInfoCtx(
            { runtime: 'nodejs', node_version: process.version },
            'Instrumentation registered'
        );
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
