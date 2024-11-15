Feature: Automation Exercise Website Account Information Page Tests

  Scenario: Verify that the Account Information Page is accessible
    Given The browser is launched and user navigates to the Account Information page
    Then user should be able to see expected  page header

  Scenario: Verify that user Name is auto-populated in Account Information Page
    Given The browser is launched and user navigates to the login page
    Then user should see the SignUp page header as "New User Signup!"
    When user enters the name "Aman Shah"
    And user enters the email "Aman@test.com"
    And user clicks on the Signup button
    Then user should be able to proceed further
    And user Name  "Aman Shah" should be auto populated to in the Account Information Page

  Scenario: Verify that user Email is auto-populated in Account Information Page
    Given The browser is launched and user navigates to the login page
    Then user should see the SignUp page header as "New User Signup!"
    When user enters the name "Aman Shah"
    And user enters the email "Aman@test.com"
    And user clicks on the Signup button
    Then user should be able to proceed further
    And user Email "Aman@test.com" should be auto populated to in the Account Information Page

  Scenario Outline: Verify that user Email is auto-populated in Account Information Page
    Given The browser is launched and user navigates to the login page
    Then user should see the SignUp page header as "New User Signup!"
    When user enters the name "<Name>"
    And user enters the email "<Email>"
    And user clicks on the Signup button
    Then user should be able to proceed further
    And user Email "<Email>" should be auto populated to in the Account Information Page
    Examples:
      | Name      | Email               |
      | Aman Shah | aman.shah@test.com  |
      | Test User | test.user@test.com  |


  Scenario: Verify that user can fill the form with test data
    Given The browser is launched and user navigates to the login page
    Then user should see the SignUp page header as "New User Signup!"
    When user enters the name "Aman Shah"
    And user enters the email "Aman@test.com"
    And user clicks on the Signup button
    Then user should be able to proceed further
     And user able to fill the form with test data
    And user should be redirected to the account created page
    And user should be able to see expected page header
