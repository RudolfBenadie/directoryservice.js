Feature: Bogus
    Scenario: Set an object property
        Given I have an empty object
        When I set prop to "aValue"
        Then I end up with object.prop of "aValue"
