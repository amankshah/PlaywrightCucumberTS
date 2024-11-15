import { Page, Locator, expect } from '@playwright/test';
import { pageElements } from "../page-support/PageElements";

export class ProductPage {
  private page: Page;
  private productPageUrl: string;
  private allProductTextLabel: Locator;
  private searchBarInput: Locator;
  private searchButton: Locator;
  private searchedProductPageLabel: Locator;
  private searchedProductCard: Locator;
  private productCard: Locator;
  private modalPopupAddToCartButton: Locator;
  private modalContinueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productPageUrl = 'https://automationexercise.com/products';

    const ProductPage = pageElements.ProductPage;

    // Initialize locators
    this.allProductTextLabel = page.locator(ProductPage.allProductTextLabel);
    this.searchBarInput = page.locator(ProductPage.searchBarInput);
    this.searchButton = page.locator(ProductPage.searchButton);
    this.searchedProductPageLabel = page.locator(ProductPage.searchedProductPageLabel);
    this.searchedProductCard = page.locator(ProductPage.searchedProductCard);
    this.productCard = page.locator(ProductPage.productCard);
    this.modalPopupAddToCartButton = page.locator(ProductPage.modalPopupAddToCartButton);
    this.modalContinueShoppingButton = page.locator(ProductPage.modalContinueShoppingButton);
  }

  // Page Actions
  async goToProductPage(): Promise<void> {
    await this.page.goto(this.productPageUrl);
  }

  async verifyProductPage(): Promise<void> {
    await expect(this.allProductTextLabel).toBeVisible();
    await expect(this.allProductTextLabel).toHaveText('All Products');
  }

  async searchProduct(productName: string): Promise<void> {
    console.log('Searching for ' + productName);
    await this.searchBarInput.fill(productName);  // Corrected reference
    await this.searchButton.click();
  }

  async verifySearchedProductTitleIsVisible(): Promise<void> {
    await expect(this.searchedProductPageLabel).toBeVisible();
    await expect(this.searchedProductPageLabel).toHaveText('Searched Products');
  }

  async verifySearchedProductCardIsVisible(): Promise<void> {
    await expect(this.searchedProductCard.first()).toBeVisible();
    const resultCount = await this.searchedProductCard.count();
    console.log('Total Displayed Product: ' + resultCount);
  }

  async hoverOverTheProductToAddToCart(productIndex: number): Promise<void> {
    const productCard = this.productCard.nth(productIndex);
    await productCard.hover();
    console.log('Hovering over product ' + productIndex);
    
    const addToCartButton = productCard.locator('.overlay-content .add-to-cart');
    await addToCartButton.waitFor();
    await addToCartButton.click();
    console.log('Clicked on add to cart button on the ' + productIndex + 'th product');
  }

  async clickModalPopupAddToCartButton(): Promise<void> {  // Renamed method for consistency
    await this.modalPopupAddToCartButton.click();
    console.log('Clicked on Add to Cart button');
  }

  async clickModalContinueShoppingButton(): Promise<void> {  // Renamed method for consistency
    await this.modalContinueShoppingButton.click();
    console.log('Clicked on Continue Shopping button');
  }
}


