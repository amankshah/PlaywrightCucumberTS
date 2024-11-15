@demosite
Feature: Demo site 
  Verify various elements and functionalities on the home page of the Automation Exercise website.



  Scenario: Verify that the home page is accessible
  Given The browser is launched and user navigates to the home page
  Then user should be landed in the portal home page
  When user clicks on the product button
  Then user should be navigated to the product page