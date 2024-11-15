
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
   this.AccountCreatedPage = await this.POManager.getAccountCreatedPage();

  console.log("Page objects initialized.");
});


Then(`user should be redirected to the account created page`, async function(this: any){
    console.log("User should be redirected to the account created page");
    // [Then] Describes the expected outcome or result of the scenario.
   await this.AccountCreatedPage.verifypageUrl();

    
});

Then(`user should be able to see expected page header`, async function(this: any) {
    console.log("User should be able to see expected page header");
    // [Then] Describes the expected outcome or result of the scenario.
    await this.AccountCreatedPage.verifyPageHeader();

});