import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    loggerLog,
    loggerWarn,
    loggerInfo,
    loggerError,
    loggerLogCtx,
    loggerWarnCtx,
    loggerInfoCtx,
    loggerErrorCtx,
} from './logger';


beforeEach(() => {
    vi.restoreAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-15T12:00:00.000Z'));
});

const parseOutput = (spy: ReturnType<typeof vi.spyOn>) => {
    return JSON.parse(spy.mock.calls[0][0] as string);
};

describe('loggerLog', () => {
    it('outputs JSON with correct level and single message', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

        loggerLog('hello');

        const output = parseOutput(spy);

        expect(output.level).toBe('log');
        expect(output.message).toBe('hello');
        expect(output.timestamp).toBe('2026-01-15T12:00:00.000Z');
        expect(output.context).toBeUndefined();
    });

    it('outputs array when multiple arguments passed', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

        loggerLog('a', 'b', 42);

        const output = parseOutput(spy);

        expect(output.message).toEqual(['a', 'b', 42]);
    });
});

describe('loggerError', () => {
    it('uses console.error with error level', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        loggerError('fail');

        const output = parseOutput(spy);

        expect(output.level).toBe('error');
        expect(output.message).toBe('fail');
    });
});

describe('loggerWarn', () => {
    it('uses console.warn with warn level', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        loggerWarn('caution');

        const output = parseOutput(spy);

        expect(output.level).toBe('warn');
    });
});

describe('loggerInfo', () => {
    it('uses console.info with info level', () => {
        const spy = vi.spyOn(console, 'info').mockImplementation(() => {});

        loggerInfo('note');

        const output = parseOutput(spy);

        expect(output.level).toBe('info');
    });
});

describe('loggerInfoCtx', () => {
    it('includes context object in output', () => {
        const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
        loggerInfoCtx({ method: 'GET', path: '/api/test' }, 'request');
        const output = parseOutput(spy);

        expect(output.level).toBe('info');
        expect(output.message).toBe('request');
        expect(output.context).toEqual({ method: 'GET', path: '/api/test' });
    });
});

describe('loggerErrorCtx', () => {
    it('includes context with error level', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        loggerErrorCtx({ status: 500 }, 'server error');

        const output = parseOutput(spy);

        expect(output.level).toBe('error');
        expect(output.context).toEqual({ status: 500 });
    });
});

describe('loggerWarnCtx', () => {
    it('includes context with warn level', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        loggerWarnCtx({ duration_ms: 600 }, 'slow');
        const output = parseOutput(spy);

        expect(output.level).toBe('warn');
        expect(output.context).toEqual({ duration_ms: 600 });
    });
});

describe('loggerLogCtx', () => {
    it('includes context with log level', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
        
        loggerLogCtx({ key: 'value' }, 'data');

        const output = parseOutput(spy);

        expect(output.level).toBe('log');
        expect(output.context).toEqual({ key: 'value' });
        expect(output.message).toBe('data');
    });
});
