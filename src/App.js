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

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({ events: locationEvents });
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
        <NumberOfEvents />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
