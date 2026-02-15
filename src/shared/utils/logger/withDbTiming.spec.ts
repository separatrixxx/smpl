import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withDbTiming } from './withDbTiming';


beforeEach(() => {
    vi.restoreAllMocks();
});

describe('withDbTiming', () => {
    it('returns the result of the wrapped function', async () => {
        vi.spyOn(console, 'info').mockImplementation(() => {});

        const result = await withDbTiming('test.query', async () => ({ id: 1, name: 'test' }));

        expect(result).toEqual({ id: 1, name: 'test' });
    });

    it('logs query label and duration', async () => {
        const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
        await withDbTiming('user.findUnique', async () => 'data');
        const output = JSON.parse(spy.mock.calls[0][0] as string);

        expect(output.context.query).toBe('user.findUnique');
        expect(typeof output.context.duration_ms).toBe('number');
        expect(output.message).toBe('DB query completed');
    });

    it('uses warn level for queries exceeding threshold', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        vi.spyOn(performance, 'now')
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(600);

        await withDbTiming('slow.query', async () => null);
        const output = JSON.parse(warnSpy.mock.calls[0][0] as string);

        expect(output.level).toBe('warn');
        expect(output.message).toBe('Slow DB query');
        expect(output.context.duration_ms).toBe(600);
    });

    it('uses info level for fast queries', async () => {
        const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
        
        vi.spyOn(performance, 'now')
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(50);

        await withDbTiming('fast.query', async () => 'ok');
        const output = JSON.parse(infoSpy.mock.calls[0][0] as string);

        expect(output.level).toBe('info');
        expect(output.context.duration_ms).toBe(50);
    });

    it('propagates errors from the wrapped function', async () => {
        vi.spyOn(console, 'info').mockImplementation(() => {});

        await expect(
            withDbTiming('failing.query', async () => { throw new Error('DB connection lost'); })
        ).rejects.toThrow('DB connection lost');
    });
});
