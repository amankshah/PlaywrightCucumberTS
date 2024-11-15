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
   this.AccountInformationPage = await this.POManager.getAccountInformation();
   this.AccountInformationTestData = testData.accountInformation;
  console.log("Page objects initialized.");
});

Given(`The browser is launched and user navigates to the Account Information page`, async function(this: any) {
  this.AccountInformationPage.goto();
});

Then(`user should be able to see expected  page header`, async function(this: any) {
  this.AccountInformationPage.verifyAccountInformationPage();
});

Then(`user Name  {string} should be auto populated to in the Account Information Page`, async function( this: any,Name: string ) {
  this.AccountInformationPage.VerifyUserNameIsAutoPopulated(Name);
});

Then(`user Email {string} should be auto populated to in the Account Information Page`, async function(this: any,Email: string) {
  this.AccountInformationPage.VerifyUserEmailIsAutoPopulated(Email);
});
Then(`user able to fill the form with test data`, async function(this: any) {
  this.AccountInformationPage.FillDataAndCreateAccount();
});