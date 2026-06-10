import { expect, test } from '@playwright/test';

test.describe('Upload form (authenticated)', () => {
  test('shows upload form fields and actions', async ({ page }) => {
    test.skip(
      !process.env.PLAYWRIGHT_TEST_EMAIL || !process.env.PLAYWRIGHT_TEST_PASSWORD,
      'Set PLAYWRIGHT_TEST_EMAIL and PLAYWRIGHT_TEST_PASSWORD to run authenticated tests.'
    );

    await page.goto('/dashboard/credentials/upload');
    await expect(page).toHaveURL(/\/dashboard\/credentials\/upload/);

    await expect(page.getByLabel('Choose a template')).toBeVisible();
    await expect(page.getByLabel('Choose an issuer (who signs this credential)')).toBeVisible();
    await expect(page.getByLabel('Specify a name for this batch (to later find it)')).toBeVisible();
    await expect(page.getByLabel('Upload your CSV file')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Submit Batch' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
  });

  test('navigates back to credentials on cancel', async ({ page }) => {
    test.skip(
      !process.env.PLAYWRIGHT_TEST_EMAIL || !process.env.PLAYWRIGHT_TEST_PASSWORD,
      'Set PLAYWRIGHT_TEST_EMAIL and PLAYWRIGHT_TEST_PASSWORD to run authenticated tests.'
    );

    await page.goto('/dashboard/credentials/upload');
    await page.getByRole('link', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/\/dashboard\/credentials/);
  });
});
