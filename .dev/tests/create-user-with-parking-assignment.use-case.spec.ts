import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * E2E Test Suite: Create User with Parking Assignment
 *
 * Use Case: create-user-with-parking-assignment
 * Actor: system-admin
 * Scenario: Creación de usuario con asignación de cupos de parqueadero por organización
 */
test.describe('System Admin - Create User with Parking Assignment', () => {
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
			const targetRoleName = 'Administrador Sistema';
			const roleCards = page.locator('button[data-test="user-role-profile-card"]');
			const count = await roleCards.count();
			for (let i = 0; i < count; i++) {
				const card = roleCards.nth(i);
				const roleName = await card.locator('[data-test="user-role-role-name"]').textContent();
				if (roleName?.includes(targetRoleName)) {
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

	test('should complete full user creation flow with parking assignment', async ({
		page,
	}) => {
		await page.goto('/users/create');
		await page.waitForLoadState('networkidle');

		// Property and Organization
		// Property select has id="assignment.propertyId"
		await page.locator('button[id="assignment.propertyId"]').click();
		await page.getByRole('option', { name: 'EcoTower 100' }).click();

		// Organization select has id="assignment.organizationId"
		await page.locator('button[id="assignment.organizationId"]').click();
		await page.getByRole('option', { name: 'MTS' }).click();

		// User Info
		// Role select has id="assignment.role"
		await page.locator('button[id="assignment.role"]').click();
		await page.getByRole('option', { name: 'Funcionario | Empleado' }).click();

		await page.locator('input[id="person.name"]').fill('Sergio Test');
		await page.locator('input[id="person.identificationNumber"]').fill('12345678');
		await page.locator('input[id="assignment.email"]').fill('sergio.test@example.com');
		await page.locator('input[id="assignment.emailConfirmation"]').fill('sergio.test@example.com');
		await page.locator('input[id="assignment.position"]').fill('QA Engineer');

		// Access Configuration
		await page.locator('#accessStartDate').click();
		// Select today or a specific date in the calendar
		await page.locator('.rdp-day_today').first().click();

		// Parking Assignment
		// Important: Si sale al menos 1 registro en la tabla: Seleccionar el primero
		// Wait for table to be loaded (it might be loading after Org selection)
		const parkingTable = page.locator('table');
		await parkingTable.waitFor({ state: 'visible', timeout: 15000 });

		const firstRow = page.locator('table tbody tr').first();
		const checkbox = firstRow.locator('button[role="checkbox"], input[type="checkbox"]');
		
		if (await checkbox.isVisible()) {
			await checkbox.click();
		}

		// Create user
		await page.getByRole('button', { name: 'Crear usuario' }).click();

		// Confirmation Modal
		const confirmButton = page.getByRole('button', { name: 'Confirmar' });
		await confirmButton.waitFor({ state: 'visible', timeout: 10000 });
		await confirmButton.click();

		// Wait for success and redirect
		await page.waitForURL(/\/users(\/|$)/, { timeout: 20000 });
	});
});
