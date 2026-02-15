import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { withLogging } from './withLogging';


beforeEach(() => {
    vi.restoreAllMocks();
});

const createRequest = (method: string, url: string) => {
    return new NextRequest(new URL(url, 'http://localhost:3000'), { method });
};

describe('withLogging', () => {
    it('returns the handler response unchanged', async () => {
        vi.spyOn(console, 'info').mockImplementation(() => {});

        const handler = vi.fn().mockResolvedValue(
            NextResponse.json({ ok: true }, { status: 200 })
        );

        const wrapped = withLogging(handler);
        const req = createRequest('GET', '/api/test');

        const response = await wrapped(req, {} as never);
        const body = await response.json();

        expect(body).toEqual({ ok: true });
        expect(response.status).toBe(200);
    });

    it('logs info for successful responses', async () => {
        const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

        const handler = vi.fn().mockResolvedValue(
            NextResponse.json({ data: [] }, { status: 200 })
        );

        const wrapped = withLogging(handler);
        const req = createRequest('GET', '/api/task?workspace=5');

        await wrapped(req, {} as never);
        const output = JSON.parse(infoSpy.mock.calls[0][0] as string);

        expect(output.context.method).toBe('GET');
        expect(output.context.path).toBe('/api/task');
        expect(output.context.search).toBe('?workspace=5');
        expect(output.context.status).toBe(200);
        expect(typeof output.context.duration_ms).toBe('number');
    });

    it('logs warn for 4xx responses', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const handler = vi.fn().mockResolvedValue(
            NextResponse.json({ error: 'Not found' }, { status: 404 })
        );

        const wrapped = withLogging(handler);
        const req = createRequest('GET', '/api/user/999');

        await wrapped(req, {} as never);
        const output = JSON.parse(warnSpy.mock.calls[0][0] as string);

        expect(output.level).toBe('warn');
        expect(output.context.status).toBe(404);
    });

    it('catches thrown errors and returns 500', async () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const handler = vi.fn().mockRejectedValue(new Error('Unexpected'));

        const wrapped = withLogging(handler);

        const req = createRequest('POST', '/api/task');

        const response = await wrapped(req, {} as never);
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body.error).toBe('Internal server error');

        const output = JSON.parse(errorSpy.mock.calls[0][0] as string);
        expect(output.level).toBe('error');
        expect(output.context.error).toContain('Unexpected');
    });

    it('passes context through to the handler', async () => {
        vi.spyOn(console, 'info').mockImplementation(() => {});

        const context = { params: Promise.resolve({ id: '42' }) };
        const handler = vi.fn().mockResolvedValue(NextResponse.json({ ok: true }));
        
        const wrapped = withLogging(handler);

        const req = createRequest('GET', '/api/task/42');

        await wrapped(req, context as never);

        expect(handler).toHaveBeenCalledWith(req, context);
    });
});
