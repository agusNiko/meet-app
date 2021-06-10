Feature: specify number of events

Scenario: when user has not specified a number of thirty two  is the default number

Given user has not specified a number of events
When the user opens the app
Then user will see a list of thirty two events

Scenario: User can change the number of events they want to see

Given user wants to see a specific number of Events 
When user change the number of events
Then user will see the chosen number of events

