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
  // Initialize the Page Object Manager
  this.POManager = new PageObjectManager(page);
  // Initialize commonly used pages, like loginPage
  this.demoPage = await this.POManager.getDemoPage(); // Add any other page objects you need
  console.log("Page objects initialize for demo page.");
});

Given(`The browser is launched and user navigates to the demo page`, async function() {
    // [Given] Sets up the initial state of the system.
    await this.demoPage.goto();
});

Then(`user should be able to see  header on demo page`, async function() {
    // [Then] Describes the expected outcome or result of the scenario.
    await this.demoPage.verifyPageHeader();
});

When(`user should be able to fill the form`, async function() {
    // [When] Describes the action or event that triggers the scenario.
    await this.demoPage.fillSearchInput(testData.demo.searchTerm);

});

Then(`user should be able to change the slider`, async function() {
    // [Then] Describes the expected outcome or result of the scenario.
    await this.demoPage.adjustSlider(testData.demo.sliderValue)
});

When(`user drop all three item in dropzone`, async function() {
    // [When] Describes the action or event that triggers the scenario.
    await this.demoPage.dropAllThreeItems();
});

Then(`user should see Hurray message`, async function() {
    // [Then] Describes the expected outcome or result of the scenario.
    await this.demoPage.verifyHurrayMessage();
});

When(`user upload file from the desktop`, async function() {
    // [When] Describes the action or event that triggers the scenario.
    await this.demoPage.dragAndDropFilesToDropZone(testData.demo.uploadFile);
});

Then(`user should be able to see file name`, async function() {
    // [Then] Describes the expected outcome or result of the scenario.
    await this.demoPage.verifyFileName();
});