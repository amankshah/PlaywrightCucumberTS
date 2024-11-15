@accountCreate
Feature: Automation Exercise Website Account Information Page Tests
Scenario: Verify that user can fill the form with test data
    Given The browser is launched and user navigates to the login page
    Then user should see the SignUp page header as "New User Signup!"
     When user enters the name "<Name>"
    And user enters the email "<Email>"
    And user clicks on the Signup button
    Then user should be able to proceed further
     And user able to fill the form with test data
    Then user should be redirected to the account created page
    Then user should be able to see expected page header
     Examples:
      | Name      | Email   |
      | Aman Shah | Random  |
    