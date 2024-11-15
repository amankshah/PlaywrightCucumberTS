@Register
Feature: Automation Exercise Website Sign Up Tests

Scenario: Verify that the SignUp Page  is accessible
  Given The browser is launched and user navigates to the SignUp page
  Then user should see the SignUp page header as "New User Signup!"

Scenario: Verify that user can see and fill the SignUp form
  Given The browser is launched and user navigates to the login page
  Then user should see the SignUp page header as "New User Signup!"
  When user enters the name "Aman Shah"
  When user enters the email "Aman@test.com"
  And user clicks on the Signup button
Then user should be able to proceed further

Scenario: Verify that user can see and fill the SignUp form using randomemail
  Given The browser is launched and user navigates to the login page
  Then user should see the SignUp page header as "New User Signup!"
  When user enters the name "Aman Shah"
  When user enters the email "Random"
  And user clicks on the Signup button
  Then user should be able to proceed further

Scenario: Verify that user is not able to proceed without filling the email
  Given The browser is launched and user navigates to the login page
  Then user should see the SignUp page header as "New User Signup!"
  When user enters the name "Aman Shah"
  When user enters the email " "
  And user clicks on the Signup button
  Then user should be not be able to proceed further