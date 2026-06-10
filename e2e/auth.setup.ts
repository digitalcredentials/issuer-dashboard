import { expect, test } from '@playwright/test';

test('authenticate and persist storage state', async ({ page }) => {
  const email = process.env.PLAYWRIGHT_TEST_EMAIL;
  const password = process.env.PLAYWRIGHT_TEST_PASSWORD;

 
  await page.goto('/login');
  await page.getByLabel('Email').fill(email as string);
  await page.getByLabel('Password').fill(password as string);
  await page.getByRole('button', { name: /log in/i }).click();

  await expect(page).toHaveURL('http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard');
  await page.context().storageState({ path: 'e2e/.auth/user.json' });
});
