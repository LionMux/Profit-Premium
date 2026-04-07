import { test, expect } from '@playwright/test';

test.describe('Materials', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[name="email"]', 'partner@example.com');
    await page.fill('[name="password"]', 'partner123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should display materials page', async ({ page }) => {
    await page.goto('/materials');
    await expect(page.locator('text=Материалы')).toBeVisible();
  });

  test('should filter materials by city', async ({ page }) => {
    await page.goto('/materials');
    await page.click('text=Москва');
    await expect(page).toHaveURL(/city=Москва/);
  });
});
