import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import CitySearch from "../CitySearch";
import { extractLocations, getEvents } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t searched for any city", () => {});

    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    then("the user should see the list of upcoming events.", () => {
      AppWrapper.update();
      expect(AppWrapper.state("events")).toHaveLength(mockData.length);
      expect(AppWrapper.find(".Event").hostNodes()).toHaveLength(
        mockData.length
      ); //Why .Event? find() Finds every node in the render tree of the current wrapper that matches the provided selector, this is A CSS selector so we will have 2 nodes with the className Event?
    });

    test("User should see a list of suggestions when they search for a city", ({
      given,
      when,
      then,
    }) => {
      let locations = extractLocations(mockData);
      let CitySearchWrapper;
      given("the main page is open", () => {
        CitySearchWrapper = shallow(
          <CitySearch updateEvents={() => {}} locations={locations} />
        );
      });

      when("the user starts typing in the city textbox", () => {
        CitySearchWrapper.find(".city").simulate("change", {
          target: { value: "Berlin" },
        });
      });

      then(
        "the user should receive a list of cities (suggestions) that match what they’ve typed",
        () => {
          expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
        }
      );
    });

    test("User can select a city from the suggested list", ({
      given,
      and,
      when,
      then,
    }) => {
      let AppWrapper;
      given("user was typing “Berlin” in the city textbox", async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.find(".city").simulate("change", {
          target: { value: "Berlin" },
        });
      });

      and("the list of suggested cities is showing", () => {
        AppWrapper.update();
        expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
      });

      when(
        "the user selects a city (e.g., “Berlin, Germany”) from the list",
        () => {
          AppWrapper.find(".suggestions li").at(0).simulate("click");
        }
      );

      then(
        "their city should be changed to that city (i.e., “Berlin, Germany”)",
        () => {
          let CitySearchWrapper = AppWrapper.find(CitySearch);

          expect(CitySearchWrapper.state("query")).toBe(
            CitySearchWrapper.state("suggestions")[0] //of.state("Berlin, Germany")
          );
        }
      );

      and(
        "the user should receive a list of upcoming events in that city",
        () => {
          expect(AppWrapper.find(".Event")).toHaveLength(mockData.length); //why mockData.length it has a length of 2 and there is just 1 even in Berlin
        }
      );
    });
  });
});
