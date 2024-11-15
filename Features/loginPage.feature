Feature: Automation Exercise Website Tests

Scenario: Verify that the login page is accessible
  Given The browser is launched and user navigates to the login page
  Then user should see the login page header as "Login to your account"



Scenario: Verify that user can see and fill the login form
  Given The browser is launched and user navigates to the login page
  Then user should see the login page header as "Login to your account"
  When user enters the username "AmanShah+839@ltim.com"
  And user enters the password "aman@2024"
  And user clicks on the login button
  Then Verify that Logged in as "Aman Shah" is visible  


Scenario: Verify that user is getting error mesage when user enters wrong email id
  Given The browser is launched and user navigates to the login page
  Then user should see the login page header as "Login to your account"
  When user enters the username "AmanShah+83911@ltim.com"
  And user enters the password "aman@2024"
  And user clicks on the login button
  Then Verify that user is getting error message
  And Verify that the error message is as expected

Scenario: Verify that user is getting error mesage when user enters wrong password
  Given The browser is launched and user navigates to the login page
  Then user should see the login page header as "Login to your account"
  When user enters the username "AmanShah+839@ltim.com"
  And user enters the password "aman@202411"
  And user clicks on the login button
  Then Verify that user is getting error message
  And Verify that the error message is as expected

Scenario: Verify that user is getting error mesage when user enters both email and password wrong
  Given The browser is launched and user navigates to the login page
  Then user should see the login page header as "Login to your account"
  When user enters the username "AmanShah+83911@ltim.com"
  And user enters the password "aman@202411"
  And user clicks on the login button
  Then Verify that user is getting error message
  And Verify that the error message is as expected

