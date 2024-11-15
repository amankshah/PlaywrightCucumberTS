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
   this.loginPage = await this.POManager.getLoginPage();
  console.log("Page objects initialized.");
});




Given('The browser is launched and user navigates to the login page', async function (this: any) {
  console.log("The browser is launched");
  this.elementUtils = new ElementUtil(page);
  
  await this.elementUtils.gotoURL(pageElements.LoginPage.url);
  console.log("Navigated to URL:", pageElements.LoginPage.url);


  expect(await this.loginPage.loginPageHeader).toContainText(this.loginPage.expectedLoginPageHeader);
 
});



Then('user should see the login page header as {string}', async function (this: any, headerTitle:string) {
  await this.loginPage.verifyLoginPage(headerTitle);
  console.log("Verifying Header" )
});

When('user enters the username {string}', async function (this: any, email:string) {
  await this.loginPage.fillLoginEmail(email)
  console.log("LoginEmail as :"+ email )
});

When('user enters the password {string}', async function (this: any,password:string) {
  await this.loginPage.fillPassword(password)
  console.log(`Filling Password ${password}`)

});

When('user clicks on the login button', async function (this: any) {
  await this.loginPage.clickLoginButton();
  console.log(`Clicking Login Button!  `)
});


Then('Verify that Logged in as {string} is visible', async function (this: any, UserFirstAndLastName:string) {
  // Write code here that turns the phrase above into concrete actions
  await this.loginPage.verifyLoggedInAsButton(UserFirstAndLastName)

});


Then('Verify that user is getting error message', async function (this: any) {
  await this.loginPage.verifyErrorMessageIsVisible();
});

Then('Verify that the error message is as expected', async function (this: any) {
  await this.loginPage.verifyErrorMessageTest();
});