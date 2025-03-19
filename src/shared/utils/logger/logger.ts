const createLogger = (type: 'log' | 'warn' | 'info' | 'error') => (message: string) => {
    console[type](message);
};

export const loggerLog = createLogger('log');
export const loggerWarn = createLogger('warn');
export const loggerInfo = createLogger('info');
export const loggerError = createLogger('error');
