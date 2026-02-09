Feature: LinkedIn Easy Apply

  @user=user1
  Scenario: Validate Easy Apply form fields
    Given user is on LinkedIn Jobs page
    When user searches for Easy Apply job
    And user opens Easy Apply form
    Then required fields should be displayed
    Then submit button should be disabled
