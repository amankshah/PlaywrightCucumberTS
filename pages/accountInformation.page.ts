import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../page-support/testData";
import ElementUtil from "../utils/elements-utils";
import { pageElements } from "../page-support/PageElements";

import { homedir } from "os";
import { promises } from "dns";
import test from "node:test";

export class AccountInformation {
  private page: Page;

  private accountInformationUrl: string;
  private EnterAccountInformation: Locator;

  //Title ----------------------------
  private MrRadioButton: Locator;
  private MrsRadioButton: Locator;
  //Title End--------------------------------
  private NameField: Locator;
  private EmailField: Locator;
  private PasswordField: Locator;
  //Dob-----------------------------
  private days: Locator;
  private months: Locator;
  private years: Locator;
  //Dob End--------------------------------
  private NewsletterCheckBox: Locator;
  private SpecialOffersCheckBox: Locator;
  private FirstNameField: Locator;
  private LastNameField: Locator;
  private CompanyField: Locator;
  private AddressField: Locator;
  private Address2Field: Locator;
  private CountryField: Locator;
  private StateField: Locator;
  private CityField: Locator;
  private ZipcodeField: Locator;
  private MobileNumberField: Locator;
  private CreateAccountButton: Locator;
  private AccountInformationTestData: any;
  private EXPECTED_ACCOUNT_INFORMATION_TEXT: string;

  constructor(page: Page) {
    this.page = page;

    // Assign URLs and expected text
    this.EXPECTED_ACCOUNT_INFORMATION_TEXT = pageElements.AccountInformation.EXPECTED_ACCOUNT_INFORMATION_TEXT;
    this.accountInformationUrl = pageElements.AccountInformation.accountInformationUrl;

    // Initialize locators using pageElements for consistency
    this.EnterAccountInformation = page.locator(pageElements.AccountInformation.EnterAccountInformation);
    this.MrRadioButton = page.locator(pageElements.AccountInformation.MrRadioButton);
    this.MrsRadioButton = page.locator(pageElements.AccountInformation.MrsRadioButton);
    this.NameField = page.locator(pageElements.AccountInformation.NameField);
    this.EmailField = page.locator(pageElements.AccountInformation.EmailField);
    this.PasswordField = page.locator(pageElements.AccountInformation.PasswordField);
    this.days = page.locator(pageElements.AccountInformation.days);
    this.months = page.locator(pageElements.AccountInformation.months);
    this.years = page.locator(pageElements.AccountInformation.years);
    this.NewsletterCheckBox = page.locator(pageElements.AccountInformation.NewsletterCheckBox);
    this.SpecialOffersCheckBox = page.locator(pageElements.AccountInformation.SpecialOffersCheckBox);
    this.FirstNameField = page.locator(pageElements.AccountInformation.FirstNameField);
    this.LastNameField = page.locator(pageElements.AccountInformation.LastNameField);
    this.CompanyField = page.locator(pageElements.AccountInformation.CompanyField);
    this.AddressField = page.locator(pageElements.AccountInformation.AddressField);
    this.Address2Field = page.locator(pageElements.AccountInformation.Address2Field);
    this.CountryField = page.locator(pageElements.AccountInformation.CountryField);
    this.StateField = page.locator(pageElements.AccountInformation.StateField);
    this.CityField = page.locator(pageElements.AccountInformation.CityField);
    this.ZipcodeField = page.locator(pageElements.AccountInformation.ZipcodeField);
    this.MobileNumberField = page.locator(pageElements.AccountInformation.MobileNumberField);
    this.CreateAccountButton = page.locator(pageElements.AccountInformation.CreateAccountButton);

    console.log("AccountInformationPage initialized.");
  }

  async goto() {
    try {
      await this.page.waitForLoadState("networkidle");
      await this.page.goto(this.accountInformationUrl);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyAccountInformationPage() {
    try {
      // await this.page.waitForLoadState("networkidle");

      await this.page.waitForSelector(
        pageElements.AccountInformation.EnterAccountInformation,
        { state: "visible" }
      );
      await expect(this.EnterAccountInformation).toBeVisible();
      await expect(this.EnterAccountInformation).toHaveText(
        this.EXPECTED_ACCOUNT_INFORMATION_TEXT
      );
    } catch (error) {
      console.error(error);
    }
  }

  async VerifyUserNameIsAutoPopulated(Name: string) {
    try {
      await expect( this.NameField).toHaveValue(Name);
    } catch (error) {
      console.error(error);
    }
  }
  async VerifyUserEmailIsAutoPopulated(email: string) {
    try {
      await expect( this.EmailField).toHaveValue(email);
    } catch (error) {
      console.error(error);
    }
  }

  async FillDataAndCreateAccount() {
    //As this will be taking number of variables so we will fetch the data directly from the testData.json
    await this.page.waitForSelector(
      pageElements.AccountInformation.EnterAccountInformation,
      { state: "visible" }
    );
   try {
      //Title ----------------------------
     //Title ----------------------------
    if (testData.accountInformation.Title == "Mr") {
      await this.MrRadioButton.check();
    } else {
      await this.MrsRadioButton.check();
    }

    //Title End--------------------------------

    await this.PasswordField.fill(testData.accountInformation.Password);
    await this.days.selectOption({
      label: testData.accountInformation.Dob.Day,
    });
    await this.months.selectOption({
      label: testData.accountInformation.Dob.Month,
    });
    await this.years.selectOption({
      label: testData.accountInformation.Dob.Year,
    });
    await this.NewsletterCheckBox.check();
    await this.SpecialOffersCheckBox.check();
    await this.FirstNameField.fill(testData.accountInformation.FirstName);
    await this.LastNameField.fill(testData.accountInformation.LastName);
    await this.CompanyField.fill(testData.accountInformation.Company);
    await this.AddressField.fill(testData.accountInformation.Address);
    await this.Address2Field.fill(testData.accountInformation.Address2);
    await this.CountryField.selectOption({
      label: testData.accountInformation.Country,
    });
    await this.StateField.fill(testData.accountInformation.State);
    await this.CityField.fill(testData.accountInformation.City);
    await this.ZipcodeField.fill(testData.accountInformation.ZipCode);
    await this.MobileNumberField.fill(testData.accountInformation.MobileNumber);
    await this.CreateAccountButton.click();
      console.log("Account Created Successfully");
      console.log("Page URL:" + this.page.url());

    } catch (error) {
      console.error(error);
    } 
  }
}
