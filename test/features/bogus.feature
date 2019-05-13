Feature: Bogus
    Scenario: Set an object property
        Given I have an empty object
        When I set prop to "value"
        Then I end up with object.prop of "value"
