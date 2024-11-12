// login.test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');


test.describe('Login Flow', () => {
    let loginPage;
   
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
       
    }, 60000);

    test('should login successfully with valid credentials', async () => {
        await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await loginPage.login('Admin', 'admin123');
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await loginPage.login('Prajakta', 'Prajakta');
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBe('Invalid credentials');
    });

    test.afterAll(async () => {
        //await page.close();
    });
});
