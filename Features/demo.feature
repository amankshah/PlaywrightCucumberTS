@demosite
Feature: Demo site 
  Verify various elements and functionalities on the home page of the Automation Exercise website.



  Scenario: Do some testing on demo page 
  Given The browser is launched and user navigates to the demo page
  Then user should be able to see  header on demo page
  When user should be able to fill the form 
  Then user should be able to change the slider
  When user drop all three item in dropzone
  Then user should see Hurray message
  When user upload file from the desktop
  Then user should be able to see file name

