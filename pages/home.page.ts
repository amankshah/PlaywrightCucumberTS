import { Page, Locator, expect } from '@playwright/test';

import { testData } from "../page-support/testData";
import ElementUtil from "../utils/elements-utils";
import { pageElements } from "../page-support/PageElements";

import { homedir } from "os";
import { promises } from "dns";
import test from "node:test";

export class HomePage {
  private page: Page;
  private loginButtonSelector: Locator;
  private loggedInAsButton: Locator;
  private accountDeleteButton: Locator;
  private productButton: Locator;
  private cartButton: Locator;
  private logoutButton: Locator;
  private footerSection: Locator;
  private subscriptionLabel: Locator;
  private subscriberEmailField: Locator;
  private subscribeEmailSubmitButton: Locator;
  private subscribeSuccessMessage: Locator;
  private fullFledgedText: Locator;

  constructor(page: Page) {
    this.page = page;
    const elements = pageElements.HomePage;

    this.loginButtonSelector = page.locator(elements.loginButtonSelector);
    this.loggedInAsButton = page.locator(elements.loggedInAsButton);
    this.accountDeleteButton = page.locator(elements.accountDeleteButton);
    this.productButton = page.locator(elements.productButton);
    this.cartButton = page.locator(elements.cartButton).first();
    this.logoutButton = page.locator(elements.logoutButton);
    this.footerSection = page.locator(elements.footerSection);
    this.subscriptionLabel = page.locator(elements.subscriptionLabel);
    this.subscriberEmailField = page.locator(elements.subscriberEmailField);
    this.subscribeEmailSubmitButton = page.locator(elements.subscribeEmailSubmitButton);
    this.subscribeSuccessMessage = page.locator(elements.subscribeSuccessMessage);
    this.fullFledgedText = page.getByRole("heading").filter({ hasText: elements.fullFledgedText });
  }

  async goToHomePage(): Promise<void> {
    const homepageUrl = "https://automationexercise.com/";
    await this.page.goto(homepageUrl);
  }

  async verifyHomePage(): Promise<void> {
    await expect(this.page).toHaveTitle("Automation Exercise");
    await expect(this.page).toHaveURL("https://automationexercise.com/");
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButtonSelector.click();
  }

  async verifyLoggedInAsButton(registerUserName: string): Promise<void> {
    await this.loggedInAsButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.loggedInAsButton).toBeVisible();

    const loggedInAsButtonText = await this.loggedInAsButton.textContent();
    const expectedText = `Logged in as ${registerUserName}`;
    await expect(this.loggedInAsButton).toHaveText(expectedText);
    console.log(loggedInAsButtonText);
  }

  async verifyAccountDeleteButtonIsVisible(): Promise<void> {
    await this.accountDeleteButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.accountDeleteButton).toBeVisible();
    console.log("Account Delete Button Visible");
  }

  async clickAccountDeleteButton(): Promise<void> {
    await this.accountDeleteButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.accountDeleteButton).toBeVisible();
    await this.accountDeleteButton.click();
    console.log("Account Delete Button Clicked");
  }

  async verifyProductButtonIsVisible(): Promise<void> {
    await this.productButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.productButton).toBeVisible();
    console.log("Product Button Visible");
  }

  async clickProductButton(): Promise<void> {
    await expect(this.productButton).toBeVisible();
    await this.productButton.click();
    console.log("Product Button Clicked");
  }

  async verifyCartButtonIsVisible(): Promise<void> {
    await this.cartButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.cartButton).toBeVisible();
    console.log("Cart Button Visible");
  }

  async clickCartButton(): Promise<void> {
    await expect(this.cartButton).toBeVisible();
    await this.cartButton.click();
    console.log("Cart Button Clicked");
  }

  async verifySubscriptionLabel(): Promise<void> {
    await expect(this.subscriptionLabel).toBeVisible();
    await expect(this.subscriptionLabel).toHaveText("Subscription");
    console.log("Subscription Label Verified");
  }

  async scrollToBottom(): Promise<void> {
    await this.footerSection.scrollIntoViewIfNeeded();
    console.log("Scrolled to Bottom");
  }

  async scrollToFullFledgedText(): Promise<void> {
    await this.fullFledgedText.scrollIntoViewIfNeeded();
    console.log("Scrolled to Full Fledged Text");
  }

  async verifyFullFledgedTextIsVisible(): Promise<void> {
    await this.fullFledgedText.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.fullFledgedText).toBeVisible();
    console.log("Full Fledged Text Verified");
  }
}


