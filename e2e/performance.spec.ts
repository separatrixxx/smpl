import { test, expect } from '@playwright/test';


const MOCK_TELEGRAM_ID = '862381667';
const API_TIMEOUT_MS = 3000;

test.describe('API performance', () => {
    test('GET /api/workspace responds within timeout', async ({ request }) => {
        const start = Date.now();
        const response = await request.get(`/api/workspace?userId=${MOCK_TELEGRAM_ID}`);
        const duration = Date.now() - start;

        expect(response.status()).toBe(200);
        expect(duration).toBeLessThan(API_TIMEOUT_MS);
    });

    test('GET /api/workspace/my responds within timeout', async ({ request }) => {
        const start = Date.now();
        const response = await request.get(`/api/workspace/my?userId=${MOCK_TELEGRAM_ID}`);
        const duration = Date.now() - start;

        expect(response.status()).toBe(200);
        expect(duration).toBeLessThan(API_TIMEOUT_MS);
    });

    test('GET /api/task?project=my responds within timeout', async ({ request }) => {
        const start = Date.now();
        const response = await request.get(
            `/api/task?project=my&userId=${MOCK_TELEGRAM_ID}`
        );
        const duration = Date.now() - start;

        expect(response.status()).toBe(200);
        expect(duration).toBeLessThan(API_TIMEOUT_MS);
    });

    test('GET /api/project responds within timeout', async ({ request }) => {
        const wsResponse = await request.get(`/api/workspace/my?userId=${MOCK_TELEGRAM_ID}`);
        const ws = await wsResponse.json();

        const start = Date.now();
        const response = await request.get(`/api/project?workspace=${ws.id}`);
        const duration = Date.now() - start;

        expect(response.status()).toBe(200);
        expect(duration).toBeLessThan(API_TIMEOUT_MS);
    });
});

test.describe('Page performance', () => {
    test('my-workspace page loads within 5 seconds', async ({ page }) => {
        const start = Date.now();

        await page.goto('/my-workspace');
        await page.waitForLoadState('networkidle');

        const duration = Date.now() - start;

        expect(duration).toBeLessThan(5000);
    });

    test('no layout shifts on my-workspace (CLS check)', async ({ page }) => {
        await page.goto('/my-workspace');
        await page.waitForLoadState('networkidle');

        const cls = await page.evaluate(() => {
            return new Promise<number>((resolve) => {
                let clsValue = 0;
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        // @ts-expect-error LayoutShift API
                        if (!entry.hadRecentInput) {
                            // @ts-expect-error LayoutShift API
                            clsValue += entry.value;
                        }
                    }
                });

                observer.observe({ type: 'layout-shift', buffered: true });

                setTimeout(() => {
                    observer.disconnect();
                    resolve(clsValue);
                }, 3000);
            });
        });

        expect(cls).toBeLessThan(0.25);
    });
});
