type LogLevel = 'log' | 'warn' | 'info' | 'error';

interface LogContext {
    [key: string]: unknown,
}

const formatMessage = (level: LogLevel, message: unknown[], context?: LogContext): string => {
    const payload: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
        level,
        message: message.length === 1 ? message[0] : message,
    };

    if (context) {
        payload.context = context;
    }

    return JSON.stringify(payload);
};

const createLogger = (type: LogLevel) => (...message: unknown[]) => {
    console[type](formatMessage(type, message));
};

const createContextLogger = (type: LogLevel) => (context: LogContext, ...message: unknown[]) => {
    console[type](formatMessage(type, message, context));
};

export const loggerLog = createLogger('log');
export const loggerWarn = createLogger('warn');
export const loggerInfo = createLogger('info');
export const loggerError = createLogger('error');

export const loggerLogCtx = createContextLogger('log');
export const loggerWarnCtx = createContextLogger('warn');
export const loggerInfoCtx = createContextLogger('info');
export const loggerErrorCtx = createContextLogger('error');
