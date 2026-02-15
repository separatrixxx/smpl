import { loggerInfoCtx, loggerWarnCtx } from './logger';


const SLOW_QUERY_THRESHOLD_MS = 500;

export const withDbTiming = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
    const start = performance.now();
    const result = await fn();
    const duration = Math.round(performance.now() - start);

    const logFn = duration >= SLOW_QUERY_THRESHOLD_MS ? loggerWarnCtx : loggerInfoCtx;
    const message = duration >= SLOW_QUERY_THRESHOLD_MS ? 'Slow DB query' : 'DB query completed';

    logFn({ query: label, duration_ms: duration }, message);

    return result;
};
