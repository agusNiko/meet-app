import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import Event from "../Event";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppWrapper;
    given("the main page is open.", () => {
      AppWrapper = mount(<App />);
    });

    when("the user first sees the event list", () => {});

    then("user will see the details of the event collapsed by default", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".EventDetails")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given("the elements are collapsed", () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    when("the user click on see more", () => {
      EventWrapper.find(".showMore").simulate("click");
    });

    then("the event info will be shown", () => {
      expect(EventWrapper.find(".EventDetails")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given("the event info is shown", () => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
      EventWrapper.setState({
        show: true,
      });
      expect(EventWrapper.find(".EventDetails")).toHaveLength(1);
    });

    when("the user click see less", () => {
      EventWrapper.find(".showLess").simulate("click");
    });

    then("the event info will be hide", () => {
      expect(EventWrapper.find(".EventDetails")).toHaveLength(0);
    });
  });
});
