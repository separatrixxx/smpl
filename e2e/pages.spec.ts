import { test, expect } from '@playwright/test';


test.describe('Page loading', () => {
    test('homepage loads and redirects', async ({ page }) => {
        const response = await page.goto('/');

        expect(response?.status()).toBeLessThan(400);
    });

    test('my-workspace page loads', async ({ page }) => {
        const response = await page.goto('/my-workspace');

        expect(response?.status()).toBeLessThan(400);
        await expect(page).toHaveURL(/my-workspace/);
    });

    test('profile page loads', async ({ page }) => {
        const response = await page.goto('/profile');

        expect(response?.status()).toBeLessThan(400);
    });

    test('workspace page loads', async ({ page }) => {
        const workspaces = await page.request.get('/api/workspace');
        const data = await workspaces.json();

        if (Array.isArray(data) && data.length > 0) {
            const response = await page.goto(`/workspace/${data[0].id}`);

            expect(response?.status()).toBeLessThan(400);
        }
    });

    test('no console errors on my-workspace', async ({ page }) => {
        const errors: string[] = [];

        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('/my-workspace');
        await page.waitForTimeout(2000);

        const criticalErrors = errors.filter(
            (e) => !e.includes('favicon') && !e.includes('hydration')
        );

        expect(criticalErrors).toHaveLength(0);
    });
});
