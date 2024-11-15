import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../page-support/testData";
import ElementUtil from "../utils/elements-utils";
import { pageElements } from "../page-support/PageElements";

import { homedir } from "os";
import { promises } from "dns";

export class AccountCreatedPage {
  page: Page;
  AccountCreatedPageUrl: string;
  AccountCreatedLabel: Locator;
  ContinueButton: Locator;
  EXPECTED_SECTION_HEADER: string;

  constructor(page: Page) {
    this.page = page;
    this.AccountCreatedPageUrl = pageElements.AccountCreatedPage.url;
    this.AccountCreatedLabel = page.locator(pageElements.AccountCreatedPage.sectionHeader);
    this.ContinueButton = page.locator(pageElements.AccountCreatedPage.ContinueButton);
    this.EXPECTED_SECTION_HEADER = pageElements.AccountCreatedPage.EXPECTED_SECTION_HEADER;
  }

  async verifypageUrl(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await this.AccountCreatedLabel.waitFor({ state: "visible", timeout: 10000 });
    // expect(this.AccountCreatedLabel).toBeVisible();
//verify page url 
    await this.page.waitForURL(this.AccountCreatedPageUrl);
    expect (this.page.url()).toBe(this.AccountCreatedPageUrl);
    console.log(`Account Created Page URL: ${this.page.url()}`);
  }
  async verifyPageHeader(): Promise<void> {
  await this.AccountCreatedLabel.first().waitFor({ state: "visible", timeout: 10000 });
    const accountCreatedText = await this.AccountCreatedLabel.first().textContent();
    expect(accountCreatedText).toBe(this.EXPECTED_SECTION_HEADER);
    this.page.pause();
    console.log(`Account Created Page Header: ${accountCreatedText}`);
  }

  async clickContinueButtonOnAccountCreatedPage(): Promise<void> {
    await this.ContinueButton.click();
  }
}


