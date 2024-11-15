import { Page, Locator, expect } from '@playwright/test';
import exp from 'constants';
import dotenv from 'dotenv';
import { testData } from '../page-support/testData';
import path from 'path';
dotenv.config();


export class AutomationTestingPage {
  private page: Page;
  
  // Locators for form elements
  private searchInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private slider: Locator;
  private radioOption1: Locator;
  private radioOption2: Locator;
  private multiSelect: Locator;
  private singleSelect: Locator;
  private fileInput: Locator;
  private submitButton: Locator;
  private progressBar: Locator;
  
  // Locators for drag-and-drop elements
  private dragItem1: Locator;
  private dragItem2: Locator;
  private dragItem3: Locator;
  private dropZone: Locator;

  // Locators for modal popup
  private modalOpenButton: Locator;
  private modal: Locator;
  private modalCloseButton: Locator;
  private modalSaveButton: Locator;

  // Locators for file drag-and-drop area
  private fileElem: Locator;
  private browseBtn: Locator;
  private fileList: Locator;
  
  // Movie elements
  private movieContainer: Locator;
  private movieTable: Locator;
  private movieList: Locator;
  private hurrayMessage: Locator;
  private pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.pageHeader = page.locator("div[class='container mt-5'] h1")
    // Form elements
    this.searchInput = page.locator('#searchInput');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.slider = page.locator('#slider');
    this.radioOption1 = page.locator('#radio1');
    this.radioOption2 = page.locator('#radio2');
    this.multiSelect = page.locator('#multiSelect');
    this.singleSelect = page.locator('#singleSelect');
    this.fileInput = page.locator('#fileInput');
    this.submitButton = page.locator('button[type="submit"]');
    this.progressBar = page.locator('#progressBar');
    
    // Drag-and-drop elements
    this.dragItem1 = page.locator('#dragItem1');
    this.dragItem2 = page.locator('#dragItem2');
    this.dragItem3 = page.locator('#dragItem3');
    this.dropZone = page.locator('.drop-zone');

    // Modal elements
    this.modalOpenButton = page.locator('[data-bs-toggle="modal"]');
    this.modal = page.locator('#exampleModal');
    this.modalCloseButton = page.locator('.btn-close');
    this.modalSaveButton = page.locator('.btn-primary');

    // File drag-and-drop area
    this.fileElem = page.locator('#fileElem');
    this.browseBtn = page.locator('#browseBtn');
    this.fileList = page.locator('#file-list');

    // Movie elements
    this.movieContainer = page.locator('#movieContainer');
    this.movieTable = page.locator('#movie-table');
    this.movieList = page.locator('#movie-list');

    this.hurrayMessage =  page.locator('.hurray-message h3');
  }

  async goto() {
    // Navigate to the demo page
    console.log(`Navigating to ${process.env.DEMO_URL}`);
    let url:any = process.env.DEMO_URL;
    try {
      await this.page.waitForLoadState("networkidle");
      await this.page.goto(url);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyPageHeader() {
    try {
      await expect(this.pageHeader).toHaveText('Automation Testing Elements');
    } catch (error) {
      console.error(error);
    }
  }
  // Method to fill the search input field
  async fillSearchInput(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  // Method to fill the email input field
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Method to fill the password input field
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // Method to adjust the slider
  async adjustSlider(value: number) {
    await this.slider.fill(value.toString());
  }

  // Method to select radio button Option1
  async selectRadioOption1() {
    await this.radioOption1.check();
  }

  // Method to select radio button Option2
  async selectRadioOption2() {
    await this.radioOption2.check();
  }

  // Method to select multiple options in multi-select dropdown
  async selectMultipleOptions(options: string[]) {
    await this.multiSelect.selectOption(options);
  }

  // Method to select a single option in the dropdown
  async selectSingleOption(option: string) {
    await this.singleSelect.selectOption(option);
  }

  // Method to upload a file
  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  // Method to submit the form
  async submitForm() {
    await this.submitButton.click();
  }

  // Method to check the progress bar value
  async checkProgressBar() {
    const progressValue = await this.progressBar.getAttribute('aria-valuenow');
    return progressValue;
  }

  // Method to drag an item and drop it in the drop zone
  async dragAndDropItem(item: Locator) {
    await item.dragTo(this.dropZone);
  }

  async dropAllThreeItems() {
    await this.dragAndDropItem(this.dragItem1);
    await this.dragAndDropItem(this.dragItem2);
    await this.dragAndDropItem(this.dragItem3);
  }

  // Method to open the modal popup
  async openModal() {
    await this.modalOpenButton.click();
  }

  // Method to close the modal
  async closeModal() {
    await this.modalCloseButton.click();
  }

  // Method to save changes in the modal
  async saveChangesInModal() {
    await this.modalSaveButton.click();
  }

// Method to drag and drop files to the drop zone
async dragAndDropFilesToDropZone(filePaths: string[]) {
   
  for (const filePath of filePaths) {
    // Resolve the file path relative to the project directory
    const resolvedFilePath = path.resolve(__dirname, filePath);

    await this.fileElem.setInputFiles(resolvedFilePath);

    await this.browseBtn.click();

    const fileName = resolvedFilePath.split(path.sep).pop() || resolvedFilePath;

    await expect(this.fileList.locator('p')).toContainText(fileName);
}
  }
  async verifyFileName() {
    const fileName = testData.demo.uploadFile;
    const fileElement = this.fileList.locator('p');
    await expect(fileElement).toContainText(fileName);
  }
  

async verifyHurrayMessage() {
  const page = this.page;

  await page.waitForSelector('.hurray-message h3');

  try {
    
    await expect(this.hurrayMessage).toBeVisible(); // Validate visibility
    await expect(this.hurrayMessage).toHaveText('Hurray! You dropped all the draggable items!'); // Validate the text

}
catch (error) {
  console.error('Error verifying hurray message:', error);
}       
}

}
