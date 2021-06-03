import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });

  test("Summary is shown", () => {
    expect(EventWrapper.find(".EventLocation")).toHaveLength(1);
  });
  test("Location is shown", () => {
    expect(EventWrapper.find(".EventLocation")).toHaveLength(1);
  });

  test("Date and timezone are shown", () => {
    expect(EventWrapper.find(".EventDate")).toHaveLength(1);
  });

  test("Show more/less button is render", () => {
    expect(EventWrapper.find(".showMoreLess")).toHaveLength(1);
  });

  test("change show-state on click", () => {
    EventWrapper.setState({
      show: false,
    });

    let whenClicked = EventWrapper.state.show;

    EventWrapper.find(".showMoreLess").simulate("click");
    expect(EventWrapper.state("show")).toBe(!whenClicked);
  });

  test("hide details by default", () => {
    EventWrapper.setState({
      show: false,
    });

    expect(EventWrapper.find(".EventDetails")).toHaveLength(0);
  });

  test("show detail on click", () => {
    EventWrapper.setState({
      show: false,
    });

    EventWrapper.find(".showMoreLess").simulate("click");
    expect(EventWrapper.find(".showMoreLess")).toHaveLength(1);
  });

  test("hide details on click", () => {
    EventWrapper.setState({
      show: true,
    });

    EventWrapper.find(".showMoreLess").simulate("click");
    expect(EventWrapper.find(".EventDetails")).toHaveLength(0);
  });
});
