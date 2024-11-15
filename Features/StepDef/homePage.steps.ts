import { Before, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { page } from "../support/hooks";
import ElementUtil from '../../utils/elements-utils';
import { pageElements } from '../../page-support/PageElements';
import { testData } from '../../page-support/testData';
import { PageObjectManager } from '../../page-support/pageObjectManager';
import { test, expect } from '@playwright/test';
// Import your HomePage class

setDefaultTimeout(60 * 1000);

Before(async function (this: any) {
  if (!page) {
    throw new Error("Page is not initialized.");
  }

  // Initialize the Page Object Manager
  this.POManager = new PageObjectManager(page);
  
  // Initialize commonly used pages, like loginPage
  
  this.homePage = await this.POManager.getHomePage(); // Add any other page objects you need

  console.log("Page objects initialized.");
});


Given(`The browser is launched and user navigates to the home page`, async function() {
    
    await this.homePage.goToHomePage();

});
When("user navigates to homepage", async function() {
    await this.homePage.goToHomePage();
});

Then(`user should be landed in the portal home page`, async function() {
    await this.homePage.verifyHomePage();
});

When(`user clicks on the product button`, async function() {
    await this.homePage.clickProductButton();
});

Then(`user should be navigated to the product page`, async function() {
    // [Then] Describes the expected outcome or result of the scenario.
});