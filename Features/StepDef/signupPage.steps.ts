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
   this.SignUpPage = await this.POManager.getSignUpPage();
  console.log("Page objects initialized.");
});


Given(`The browser is launched and user navigates to the SignUp page`, async function (this: any){
    console.log("The browser is launched");
    this.elementUtils = new ElementUtil(page);
    await this.elementUtils.gotoURL(this.SignUpPage.SignUpPageUrl);
    console.log("Navigated to URL:", this.SignUpPage.SignUpPageUrl);
  
});

Then(`user should see the SignUp page header as {string}`, async function (this: any, expected_section_header:string ) {

    
    // await  expect( this.SignUpPage.SignUpSectionHeader).toHaveText(expected_section_header);
   await this.SignUpPage.verifySignUpPage(expected_section_header)
});


When(`user enters the name {string}`, async function(this: any, Name: string) {
  
  await  this.SignUpPage.fillNameFilled(Name);
});

When(`user enters the email {string}`, async function(this: any, Email: string) {
  await  this.SignUpPage.fillEmailFilled(Email);
});

When(`user clicks on the Signup button`, async function(this: any) {
  await  this.SignUpPage.clickSignUpButton();
});

Then("user should be able to proceed further",async function(this: any){
  await  this.SignUpPage.verifyAccountInformation();
})
Then("user should be not be able to proceed further",async function(this: any){
  await  this.SignUpPage.verifyAccountInformationIsNotVisible();
})