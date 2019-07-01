Feature: Directory Service

    The directory service is used to maintain company and people information in the system

    Scenario: Assign a legal name to a company without a legal name
        Given   A company without a legal name
        When    The legal name is assigned using the command '{"Id":"1","Entity":"Company","Method":"ChangeCompanyLegalName","Version":"0","Data":{"LegalName":"First Legal Name"}}'
        Then    The company legal name is updated to "First Legal Name"
        And     A CompanyLegalNameChanged event '{"Id":"1","Entity":"Company","Method":"CompanyLegalNameChanged","Version":"1","Data":{"LegalName":"First Legal Name"}}' is added to the event stream

