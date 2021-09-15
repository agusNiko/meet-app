# meet-app

https://agusniko.github.io/meet-app/

## Demo
https://www.youtube.com/watch?v=CCdlEfnaECM

is a progressive web application built using React and following the TDD approach. The app itself will be a “meetup” app of sorts, displaying a list of upcoming events for a city and time of the user’s choosing. It will also be available for users to use while offline (PWA)

## TDD approach & Test Scenarios

### `FEATURE 1: FILTER EVENTS BY CITY`

##### `user storie`

As a user
I should be able to “filter events by city”
So that I can see the list of events that take place in that city

#### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

#### Scenario 2: User should see a list of suggestions when they search for a city.

Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

#### Scenario 3: User can select a city from the suggested list.

Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city
And the list of suggestions should disappear.
And the user should receive a list of upcoming events in that city.

### `FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS`

##### `user storie`

as a user
I should be able to “Show and hide an event’s details.
So that I can see more information about the evens and hide it if I want, without the necessity of going to another page or section of the app.

#### Scenario 1: An event element is collapsed by default

Given the main page is open.
When the user first sees the event list
Then user will see the details of the event collapsed by default

#### Scenario 2: User can expand an event to see its details

Given the elements are collapsed
when the user click on “see more”
then the event info will be shown

#### Scenario 3: User can collapse an event to hide its details

Given the event info is shown
when the user click “see less”
Then the event info will be hide

### `FEATURE 3: SPECIFY NUMBER OF EVENTS`

##### `user storie`

as a user
I should be able to specify the number of events to be shown
so that I can personalize the amount of event that I want to be loaded when I open the app

#### Scenario 1: When user hasn’t specified a number, 32 is the default number

Given user hasn't specified a number of events.
When the user opens the app.
Then user will see 32 events by default.

#### Scenario 2: User can change the number of events they want to see

Given user changed the number of events he wants to see
when user opens the app
then user will see the chosen number of events

### `FEATURE 4: USE THE APP WHEN OFFLINE`

##### `user storie`

as a user
I should be able to use the app when offline
So that I can use the app when for some reason I don't have internet connection.

#### Scenario 1: Show cached data when there’s no internet connection

Given user have no internet connection
when user opens the app
Then cached data will be shown.

#### Scenario 2: Show error when user changes the settings (city, time range)

Given user have no internet connection
when user changes the settings
Then an error message will be shown.

### `FEATURE 5: DATA VISUALIZATION`

##### `user storie`

as a user
I should be able to visualize the data
So that I can easily see the number of upcoming events in determinate city.

#### Scenario 1: Show a chart with the number of upcoming events in each city

Given user opened the app
When user click on the chart icon
Then a chart with the number of upcoming events in each city will be shown.

## Get started
### clone the repo
### in your console run `npm i` or `npm install`
### to start the app in your console, run `npm start`
### it will take you to the offline dev mode on the app in the local host

