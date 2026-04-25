import { test, expect } from '@playwright/test';

test.describe('Client Transfer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'partner@example.com');
    await page.fill('[name="password"]', 'partner123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should display client transfer form', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.getByRole('heading', { name: 'ПЕРЕДАТЬ КЛИЕНТА' })).toBeVisible();
    // Open the modal
    await page.locator('button:has-text("Передать клиента")').first().click();
    await expect(page.locator('text=ФИО клиента')).toBeVisible();
  });

  test('should submit client transfer form', async ({ page }) => {
    await page.goto('/profile');
    // Open the modal
    await page.locator('button:has-text("Передать клиента")').first().click();
    // Fill the form inside the modal
    await page.locator('[role="dialog"] input[id="fullName"]').fill('Тестовый Клиент');
    await page.locator('[role="dialog"] input[id="phone"]').fill('+7 (999) 123-45-67');
    await page.locator('[role="dialog"] input[id="city"]').fill('Москва');
    // Submit
    await page.locator('[role="dialog"] button[type="submit"]').click();
    await expect(page.locator('text=Клиент успешно передан')).toBeVisible();
  });
});
