import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test('should add product to cart and verify', async ({ page }) => {
  // Login
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login('Prajaktaka', 'Praju@123');
  await page.waitForSelector('.dashboard');  // Wait for the dashboard to load

  // Home: Add product to cart
  const home = new HomePage(page);
  await home.addProductToCart('Nexus 6');
  await page.waitForSelector('.cart-icon');  // Wait for cart icon to be updated

  // Navigate to Cart
  await home.gotoCart();
  await page.waitForSelector('.cart-page-loaded', { timeout: 8000 });  // Ensure cart page is loaded

  // Cart: Verify the product is in the cart
  const cart = new CartPage(page);
  const status = await cart.checkProductInCart('Nexus 6');
  expect(status).toBe(true);
});
