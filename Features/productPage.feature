@productPage
Feature: Product Page Functionalities
  Verify various elements and functionalities on the product page of the Automation Exercise website.

Scenario: Verify that user is able to add product to cart 
  Given The browser is launched and user navigates to the login page
  Then user should see the login page header as "Login to your account"
  When user enters the username "AmanShah+839@ltim.com"
  And user enters the password "aman@2024"
  And user clicks on the login button
  Then Verify that Logged in as "Aman Shah" is visible
  When user navigates to homepage  
   When user clicks on the product button
  Then The user should be navigated to the products page
  When user hover over the product at index "0"
  And user click on the continue shopping Button on the model popup
  And user hover over the product at index "1"
  And user click on the Add to cart  on the model popup
  Then user sgop be redirected to the cart page
