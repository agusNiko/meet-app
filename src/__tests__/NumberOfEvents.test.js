import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";
import { App } from "../App";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<App />).find(NumberOfEvents);
  });

  test("textbox element is rendered", () => {
    expect(NumberOfEventsWrapper.find(".EventsNumber")).toHaveLength(1);
  });

  test("show 32 events by default", () => {
    expect(NumberOfEventsWrapper.find(".EventsNumber").prop("value")).toEqual(
      32
    );
  });

  test("renders text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("numberOfEvents");
    console.log(NumberOfEventsWrapper.find(".EventsNumber"));
    expect(NumberOfEventsWrapper.find(".EventsNumber").prop("value")).toBe(
      numberOfEvents
    );
  });

  test("change state when text input changes", () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: "32",
    });
    const eventObject = { target: { value: "10" } };
    NumberOfEventsWrapper.find(".EventsNumber").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe("10");
  });
});
