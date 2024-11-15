import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../page-support/testData";
import ElementUtil from "../utils/elements-utils";
import { pageElements } from "../page-support/PageElements";

import { homedir } from "os";
import { promises } from "dns";

export class LoginPage {
  private page: Page;

  private LoginPageUrl: string;
  private LoginEmailField: Locator;
  private LoginPasswordField: Locator;
  private LoginButton: Locator;
  private loginPageHeader: Locator;
  private expectedLoginPageHeader: string;
  private loggedInAsButton: Locator;
  private loginErrorMessageLabel: Locator;
  private loginErrorMessageExpectedText: string;

  private loginPageElement: any = pageElements.LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.LoginPageUrl = pageElements.LoginPage.url;
    this.loginPageHeader = page.locator(this.loginPageElement.sectionHeader);
    this.LoginEmailField = page.locator(pageElements.LoginPage.EmailField);
    this.LoginPasswordField = page.locator(
      pageElements.LoginPage.PasswordField
    );
    this.LoginButton = page.locator(pageElements.LoginPage.loginButton);
    this.loggedInAsButton = page.locator(
      pageElements.LoginPage.loggedInAsButton
    );

    this.loginErrorMessageLabel = page.locator(
      pageElements.LoginPage.errorMessage
    );
    this.loginErrorMessageExpectedText =
      pageElements.LoginPage.EXPECTED_ERROR_MESSAGE;
    this.expectedLoginPageHeader =
      pageElements.LoginPage.EXPECTED_SECTION_HEADER;
  }

  async goToLoginPage() {
    try {
      await this.page.waitForLoadState("networkidle");
      await this.page.goto(this.LoginPageUrl);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyLoginPage(title: string = this.expectedLoginPageHeader) {
    try {
      // await this.page.waitForLoadState("networkidle");
      await this.page.waitForSelector(this.loginPageElement.sectionHeader, {
        state: "visible",
      });

      expect(this.loginPageHeader).toContainText(title);
      console.log(this.loginPageHeader.textContent());
      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async fillLoginEmail(loginEmail: string) {
    try {
      await this.LoginEmailField.fill(loginEmail);

      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async fillPassword(loginPassword: string) {
    try {
      await this.LoginPasswordField.fill(loginPassword);
      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async clickLoginButton() {
    try {
      await this.LoginButton.click();
      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(loginEmail: string, loginPassword: string) {
    try {
      await this.LoginEmailField.fill(loginEmail);
      await this.LoginPasswordField.fill(loginPassword);
      await this.LoginButton.click();
      console.log("Logged In User : " + loginEmail);
      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyLoggedInAsButton(UserFirstAndLastName: string) {
    try {
      // wait for this.loggedInAsButton
      await this.loggedInAsButton.waitFor({ state: "visible", timeout: 10000 });
      await expect(this.loggedInAsButton).toBeVisible();

      const loggedInAsButtonText = await this.loggedInAsButton.textContent();
      const expectedText = `Logged in as ${UserFirstAndLastName}`;
      await expect(this.loggedInAsButton).toHaveText(expectedText);
      console.log(loggedInAsButtonText);
      return this;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyErrorMessageIsVisible() {
    try {
      await this.loginErrorMessageLabel.waitFor({
        state: "visible",
        timeout: 10000,
      });
      await expect(this.loginErrorMessageLabel).toBeVisible();
      console.log("Checking Visibility");
    } catch (error) {
      console.error(error);
    }
  }

  async verifyErrorMessageTest() {
    try {
      await this.loginErrorMessageLabel.waitFor({
        state: "visible",
        timeout: 1000,
      });
      await expect(this.loginErrorMessageLabel.locator("p")).toHaveText(
        this.loginErrorMessageExpectedText
      );
      console.log(
        `${this.loginErrorMessageLabel
          .locator("p")
          .textContent()} Matching Error message ${
          this.loginErrorMessageExpectedText
        }`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
