import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("textbox element is rendered", () => {
    expect(NumberOfEventsWrapper.find(".EventsNumber")).toHaveLength(1);
  });

  test("show 32 events by default", () => {
    expect(NumberOfEventsWrapper.find(".EventsNumber").prop("value")).toEqual(
      "32"
    );
  });

  test("renders text input correctly", () => {
    const eventShown = NumberOfEventsWrapper.state("eventShown");
    expect(NumberOfEventsWrapper.find(".EventsNumber").prop("value")).toBe(
      eventShown
    );
  });

  test("change state when text input changes", () => {
    NumberOfEventsWrapper.setState({
      eventShown: "32",
    });
    const eventObject = { target: { value: "10" } };
    NumberOfEventsWrapper.find(".EventsNumber").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("eventShown")).toBe("10");
  });
});
