import { expect, test } from '@playwright/test';

test.describe('Authentication gating', () => {
  test('redirects unauthenticated user from upload page to login', async ({ page }) => {
    await page.goto('/dashboard/credentials/upload');
    await expect(page).toHaveURL(/\/login/);
  });

  test('renders login form controls', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'Please log in to continue.' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();
  });
});
