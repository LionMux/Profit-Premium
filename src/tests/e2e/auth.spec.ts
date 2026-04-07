import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Profit Premium')).toBeVisible();
    await expect(page.locator('text=Вход в личный кабинет партнера')).toBeVisible();
  });

  test('should login with email', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'partner@example.com');
    await page.fill('[name="password"]', 'partner123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Добро пожаловать')).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Неверный email или пароль')).toBeVisible();
  });

  test('should switch between email and SMS login', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('button:has-text("Email")')).toBeVisible();
    await page.click('button:has-text("SMS")');
    await expect(page.locator('label:has-text("Телефон")')).toBeVisible();
  });
});
