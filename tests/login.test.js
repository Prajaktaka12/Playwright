// login.test.js
// login.test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');

test.describe('Login Flow', () => {
  let loginPage;
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
  }, 60000);  // Set timeout if needed

  test('should login successfully with valid credentials', async () => {
    await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await loginPage.login('Admin', 'admin123');
    // Add more assertions if necessary
  });

  test('should show error message with invalid credentials', async () => {
    await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await loginPage.login('Prajakta', 'wrongpassword');  // Using wrong credentials
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBe('Invalid credentials');  // Adjust if needed
  });

  test.afterAll(async () => {
    await page.close();  // Ensure the page is closed after tests
  });
});

