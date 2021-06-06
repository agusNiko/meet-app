import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import CitySearch from "./CitySearch";
import { getEvents } from "./api";
// import { mockData } from "./mock-data";
import { extractLocations } from "./api";
import "./style.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  updateNumberOfEvents = (eventNumber) => {
    this.props.updateNumberOfEvents(eventNumber);
  };

  //here I used slice to obtain an array of event whose length = numberOfEvents
  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({ events: locationEvents.slice(0, numberOfEvents) });
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <NumberOfEvents
          updateNumberOfEvents={this.updateNumberOfEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.numberOfEvents}
        />
        <EventList
          events={this.state.events}
          numberOfEvents={this.numberOfEvents}
        />
      </div>
    );
  }
}

export default App;
