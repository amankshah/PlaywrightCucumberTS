import { Page } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { SignUpPage } from "../pages/Signup.page";
import { AccountInformation } from "../pages/accountInformation.page";
import { pageElements } from "../page-support/PageElements";
import { getEnvVariable } from '../envReader';
import { AccountCreatedPage } from "../pages/accountCreated.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";

export class PageObjectManager {
    private Page: Page;

    private loginPage?: LoginPage;
    private signUpPage?: SignUpPage;
    private accountInformation?: AccountInformation;
    private homePage?: HomePage;
    private productPage?: ProductPage;
    private accountCreatedPage?: AccountCreatedPage;
    private pageElements: typeof pageElements;

    constructor(Page: Page) {
        this.Page = Page;
        this.pageElements = pageElements;
    }

    // Lazy initialization of pages to avoid stack overflow
    getLoginPage(): LoginPage {
        if (!this.loginPage) {
            this.loginPage = new LoginPage(this.Page);
        }
        return this.loginPage;
    }
    getHomePage(): HomePage {
        if (!this.homePage) {
            this.homePage = new HomePage(this.Page);
        }
        return this.homePage;
    }
    getProductPage(): ProductPage {
        if (!this.productPage) {
            this.productPage = new ProductPage(this.Page);
        }
        return this.productPage;
    }

    getPageElements(): typeof pageElements {
        return this.pageElements;
    }

    getSignUpPage(): SignUpPage {
        if (!this.signUpPage) {
            this.signUpPage = new SignUpPage(this.Page);
        }
        return this.signUpPage;
    }
    getAccountCreatedPage(): AccountCreatedPage {
        if (!this.accountCreatedPage) {
            this.accountCreatedPage = new AccountCreatedPage(this.Page);
        }
        return this.accountCreatedPage;
    }


    getEnvVariable(key: string): string | undefined {
        return getEnvVariable(key);
    }

    getAccountInformation(): AccountInformation {
        if (!this.accountInformation) {
            this.accountInformation = new AccountInformation(this.Page);
        }
        return this.accountInformation;
    }
}
