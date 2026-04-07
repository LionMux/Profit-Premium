import { test, expect } from '@playwright/test';

test.describe('Client Transfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'partner@example.com');
    await page.fill('[name="password"]', 'partner123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should display client transfer form', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Передать клиента')).toBeVisible();
    await expect(page.locator('text=ФИО клиента')).toBeVisible();
  });

  test('should submit client transfer form', async ({ page }) => {
    await page.goto('/profile');
    await page.fill('input[placeholder="Иванов Иван Иванович"]', 'Тестовый Клиент');
    await page.fill('input[placeholder="+7 (999) 123-45-67"]', '+79991234567');
    await page.fill('input[placeholder="Москва"]', 'Москва');
    await page.click('button:has-text("Передать клиента")');
    await expect(page.locator('text=Клиент успешно передан')).toBeVisible();
  });
});
