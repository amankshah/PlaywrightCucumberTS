import { After, Before, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

import { PageObjectManager } from '../../page-support/pageObjectManager';

import * as dotenv from 'dotenv'; 
import * as path from 'path';

dotenv.config();
setDefaultTimeout(60 * 10000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  console.clear();
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  console.log("Browser launched.");
});

Before(async function (scenario: ITestCaseHookParameter) {
  console.log("Initializing page objects...");
  if (!page) {
    throw new Error("Page is not initialized.");
  }
  this.POManager = new PageObjectManager(page);
  console.log("Page objects initialized.");
});

BeforeStep(function() {
  // Add any setup steps needed before each step
  // console.log("Before step...");
});

AfterStep(async function({ result, pickle, testStepId }) {
  // console.log("After step...");
  const timestamp = new Date().getTime();
  
  // Check if the stepId is valid and exists in the pickle
  const step = pickle.steps.find((step) => step.id === testStepId);
  if (step) {
    // console.log(`Step found: ${step.text}`);
  } else {
    // console.log(`Step not found for testStepId: ${testStepId}`);
  }
let a = pickle.steps;

//change timestamp to local time 



  // console.log(`Step ${result.status.toLowerCase()}. Timestamp: ${timestamp}. TestStepId: ${testStepId}. Pickle: ${pickle.name}. Step: ${step?.text}.`);
  const stepName = step ? "-" + step.text.trim().replace(/ /g, '_') : '';

  const scenarioName = pickle.name.replace(/ /g, '_');
  const basePath = `image/${result.status === Status.FAILED ? 'failed' : 'passed'}-screenshots`;
  const screenshotPath = `${basePath}/${scenarioName}${stepName}-${testStepId}.png`;

  await page.screenshot({ path: screenshotPath });
  console.log(`Step ${result.status.toLowerCase()}. Screenshot saved at: ${path.resolve(screenshotPath)}`);
});


After(async function({ result, pickle }) {
  // console.log("After scenario...");
  
  // If the scenario fails, take a screenshot and attach it
  if (result?.status === Status.FAILED) {
    const screenshotPath = `image/failed-screenshots/${pickle.name.replace(/ /g, '_')}-failed.png`;
    const img = await page.screenshot({ path: screenshotPath, type: "png" });
    this.attach(img, "image/png");
  }

  // Clear cookies after scenario completion
  if (context && context.pages().length > 0) {
    await context.clearCookies();
  }
});

AfterAll(async function() {
  // console.log("Closing page...");
  if (page && !page.isClosed()) {
    await page.close();
  }
  // console.log("Closing context...");
  if (context) {
    await context.close();
  }
  // console.log("Closing browser...");
  if (browser) {
    await browser.close();
  }
  console.log("Browser closed.");
});

export {
  page,
  browser,
  context
};
