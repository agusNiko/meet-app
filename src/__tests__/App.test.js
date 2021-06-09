import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";
import { waitFor } from "@testing-library/react";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("the number of events is render", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");

    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test("change state when text input changes", () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.setState({
      numberOfEvents: "32",
    });
    const eventObject = { target: { value: "10" } };
    NumberOfEventsWrapper.find(".EventsNumber").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe("10");
  });

  test("numberOfEvent state of app is updated after user changes number of events", async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ numberOfEvents: "32" });
    const eventObject = { target: { value: "10" } };

    const NumberOfEventsComponent = AppWrapper.find(NumberOfEvents);
    NumberOfEventsComponent.find(".EventsNumber").simulate(
      "change",
      eventObject
    );

    expect(AppWrapper.state("numberOfEvents")).toBe("10");

    AppWrapper.unmount();
  });

  test("events.length is updated after user changes number of events", async () => {
    //const runAllPromises = () => new Promise(setImmediate);

    const AppWrapper = mount(<App />);

    AppWrapper.setState({ numberOfEvents: "32", locations: "all" });
    const eventObject = { target: { value: 1 } };

    const NumberOfEventsComponent = AppWrapper.find(NumberOfEvents);
    await NumberOfEventsComponent.find(".EventsNumber").simulate(
      "change",
      eventObject
    );
    await waitFor(() => {
      AppWrapper.update();
      expect(AppWrapper.state("events").length).toBe(1);
    });

    // const instance = AppWrapper.instance();
    // await instance.updateNumberOfEvents(1);
    // AppWrapper.update();
    // expect(AppWrapper.state("events").length).toBe(1);

    // AppWrapper.unmount();
  });
});
