import { Before, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { page } from "../support/hooks";
import ElementUtil from '../../utils/elements-utils';
import { pageElements } from '../../page-support/PageElements';
import { testData } from '../../page-support/testData';
import { PageObjectManager } from '../../page-support/pageObjectManager';
import { test, expect } from '@playwright/test';
setDefaultTimeout(60 * 1000);

Before(async function (this: any) {
  if (!page) {
    throw new Error("Page is not initialized.");
  }
  this.POManager = new PageObjectManager(page);
   this.productPage = await this.POManager.getProductPage();
  console.log("Page objects initialized.");
});

// Assuming you have a Playwright 'page' object to interact with the browser
Then(`The user should be navigated to the products page`, async function() {
    await this.productPage.verifyProductPage();
    
});
When(`user hover over the product at index {string}`, async function(index: string) {
    // [When] Describes the action or event that triggers the scenario.
    let pindex = parseInt(index);
    await this.productPage.hoverOverTheProductToAddToCart(pindex);
});

When(`user click on the continue shopping Button on the model popup`, async function() {
    await this.productPage.clickModalContinueShoppingButton();
});

When(`user click on the Add to cart  on the model popup`, async function() {
    // [When] Describes the action or event that triggers the scenario.
    await this.productPage.clickModalPopupAddToCartButton();
});

Then(`user sgop be redirected to the cart page`, async function() {
    // [Then] Describes the expected outcome or result of the scenario.
});