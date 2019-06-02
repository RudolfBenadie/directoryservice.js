Feature: Directory Service

    The directory service is used to maintain company and people information in the system

    Scenario: Assign a legal name to a company without a legal name
        Given   A company without a legal name
        When    The legal name is assigned
        Then    The company legal name is updated
        And     A CompanyLegalNameChanged event is added to the event stream

