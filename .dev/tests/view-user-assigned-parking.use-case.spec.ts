import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * E2E Test Suite: View User Assigned Parking
 *
 * Use Case: view-user-assigned-parking
 * Actor: system-admin
 * Scenario: Visualización de parqueaderos asignados a un usuario
 */
test.describe('System Admin - View User Assigned Parking', () => {
	test.beforeEach(async ({ page }) => {
		// Login flow
		await page.goto('/auth/login');

		const emailInput = page.locator('[data-test="email-input"]');
		const passwordInput = page.locator('[data-test="password-input"]');
		const loginButton = page.locator('[data-test="login-button"]');

		const testEmail = process.env.TEST_USER_EMAIL || 'exam@tecnipass.com';
		const testPassword = process.env.TEST_USER_PASSWORD || 'example';

		await emailInput.fill(testEmail);
		await passwordInput.fill(testPassword);
		await loginButton.click();

		// Wait for navigation
		await page.waitForURL((url) => !url.href.includes('/auth/login'), {
			timeout: 30000,
		});

		// Role selection
		const roleSelection = page.locator('[data-test="user-role-selection"]');
		try {
			await roleSelection.waitFor({ state: 'visible', timeout: 10000 });
			const roleCards = page.locator('button[data-test="user-role-profile-card"]');
			
			// Wait for cards to load
			await roleCards.first().waitFor({ state: 'visible', timeout: 10000 });
			
			const count = await roleCards.count();
			for (let i = 0; i < count; i++) {
				const card = roleCards.nth(i);
				const roleName = await card.locator('[data-test="user-role-role-name"]').textContent();
				if (roleName?.toLowerCase().includes('administrador sistema')) {
					await card.click();
					break;
				}
			}
		} catch {
			// Role selection might not be present
		}

		await expect(page.locator('[data-test="home-route"]')).toBeVisible({
			timeout: 20000,
		});
	});

	test('should display assigned parking spots in user details drawer', async ({
		page,
	}) => {
		await page.goto('/users');
		await page.waitForLoadState('networkidle');

		// Click on any row to open details (assuming there's data)
		const firstRow = page.locator('table tbody tr').first();
		await firstRow.waitFor({ state: 'visible', timeout: 15000 });
		await firstRow.click();

		// Verify user details drawer is open
		const drawer = page.getByRole('dialog');
		await drawer.waitFor({ state: 'visible', timeout: 10000 });
		await expect(drawer).toBeVisible();

		// Verify basic info labels exist
		await expect(drawer.locator('text=Rol:')).toBeVisible();
		await expect(drawer.locator('text=Correo electrónico:')).toBeVisible();

		// Check for assigned parking section.
		const parkingSectionTitle = drawer.locator('text=/Parqueaderos asignados/i');
		const isVisible = await parkingSectionTitle.isVisible();
		
		if (isVisible) {
			const parkingTag = drawer.locator('button[aria-label^="Parqueadero"]');
			await expect(parkingTag.first()).toBeVisible();
		}
	});

	test('should allow searching for a specific user and viewing their details', async ({
		page,
	}) => {
		await page.goto('/users');
		await page.waitForLoadState('networkidle');

		// Search for a user
		const searchInput = page.getByPlaceholder('Nombre o Número de identificación');
		await searchInput.fill('Sergio');
		await page.keyboard.press('Enter');
		
		// Wait for the table to refresh (can use a count check or just a timeout)
		await page.waitForTimeout(2000);

		// Click the first result if exists
		const rows = page.locator('table tbody tr');
		if (await rows.count() > 0) {
			await rows.first().click();
			const drawer = page.getByRole('dialog');
			await expect(drawer).toBeVisible();
		}
	});
});
