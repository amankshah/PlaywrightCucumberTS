import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../page-support/testData";
import ElementUtil from "../utils/elements-utils";
import { pageElements } from "../page-support/PageElements";
import { RandomEmail } from "../utils/dataManupulator";
import { homedir } from "os";
import { promises } from "dns";

import dotenv from 'dotenv';
dotenv.config();

import { PageObjectManager } from '../page-support/pageObjectManager';



export class SignUpPage {
  private page: Page;
  private elementUtil: ElementUtil;
  private NameField: Locator;
  private SignUpEmailField: Locator;
  private SignUpButton: Locator;
  private SignUpSectionHeader: Locator;

  private EnterAccountInformation: Locator;
  private EXPECTED_ACCOUNT_INFORMATION_TEXT: string;

  private SignUpPageUrl: string;
  private EXPECTED_SECTION_HEADER: string;
  private POManager:PageObjectManager;
  private signUpProperties: any ;

  constructor(page: Page) {
    this.page = page;
    this.SignUpPageUrl = pageElements.SignUP.url;
    this.elementUtil = new ElementUtil(page);

      this.POManager = new PageObjectManager(page);
      

    this.SignUpSectionHeader = page.locator(
      pageElements.SignUP.SignUpSectionHeader
    );
    this.EXPECTED_SECTION_HEADER = pageElements.SignUP.EXPECTED_SECTION_HEADER;

    this.NameField = page.locator(pageElements.SignUP.NameField);
    this.SignUpEmailField = page.locator(pageElements.SignUP.SignUpEmailField);
    this.SignUpButton = page.locator(pageElements.SignUP.SignUpButton);
    this.EnterAccountInformation = page
      .locator(pageElements.SignUP.Account_information_text)
      .first();
    this.EXPECTED_ACCOUNT_INFORMATION_TEXT =
      pageElements.SignUP.EXPECTED_ACCOUNT_INFORMATION_TEXT;
  }

  async goToSignUpPage() {
    try {
      await this.page.waitForLoadState("networkidle");
      await this.page.goto(this.SignUpPageUrl);
    
   

    } catch (error) {
      console.error(error);
    }
  }
  async verifySignUpPage(title: string = this.EXPECTED_SECTION_HEADER) {
    try {
      // await this.page.waitForLoadState("networkidle");

      await this.page.waitForSelector(pageElements.SignUP.SignUpSectionHeader, {
        state: "visible",
      });

      await expect(this.SignUpSectionHeader).toContainText(title);
      console.log(`Signup Section Header " 
        ${await this.SignUpSectionHeader.textContent()}
        " and expected :"
        ${title}"`);

      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async fillNameFilled(Name: string) {
    try {
      await this.NameField.fill(Name);
      console.log(`Filling Name : ${Name}`);
    } catch (error) {
      console.error(error);
    }
  }

  async fillEmailFilled(Email: string) {
    try {
      if (Email === "Random") {
        Email = RandomEmail(process.env.EMAIL_PATTERN);
      }
      await this.SignUpEmailField.fill(Email);
      console.log(`Filling Email : ${Email}`);
    } catch (error) {
      console.error(error);
    }
  }

  async clickSignUpButton() {
    try {
      await this.SignUpButton.click();
      console.log(`Clicking SignUp Button `);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyAccountInformation() {
    try {
      await expect(this.EnterAccountInformation).toBeVisible();
      await expect(this.EnterAccountInformation).toHaveText(
        this.EXPECTED_ACCOUNT_INFORMATION_TEXT
      );
      console.log(
        "Verifying account Information text",
        await this.EnterAccountInformation.textContent()
      );
    } catch (error) {
      console.error(error);
    }
  }

  async verifyAccountInformationIsNotVisible() {
    try {
      this.elementUtil.verifycount(
        pageElements.SignUP.Account_information_text,
        0
      );
    } catch (error) {
      console.error(error);
    }
  }
}
