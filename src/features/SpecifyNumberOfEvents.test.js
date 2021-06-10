import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/SpecifyNumberOfEvents.feature");
let AppWrapper;
defineFeature(feature, (test) => {
  test("when user has not specified a number of thirty two  is the default number", ({
    given,
    when,
    then,
  }) => {
    given("user has not specified a number of events", () => {});

    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    then("user will see a list of thirty two events", () => {
      expect(AppWrapper.state("events").length).toBe(mockData.length);
    });
  });
  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    given("user wants to see a specific number of Events", () => {
      AppWrapper = mount(<App />);
    });

    when("user change the number of events", () => {
      AppWrapper.setState({ numberOfEvents: "32", locations: "all" });
      const eventObject = { target: { value: 1 } };
      const NumberOfEventsComponent = AppWrapper.find(NumberOfEvents);
      NumberOfEventsComponent.find(".EventsNumber").simulate(
        "change",
        eventObject
      );
    });

    then("user will see the chosen number of events", () => {
      AppWrapper.update();
      expect(AppWrapper.state("events").length).toBe(1);
    });
  });
});
