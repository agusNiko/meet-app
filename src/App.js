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
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      currentLocation: undefined,
    };
  }

  // state = {
  //   events: [],
  //   locations: [],
  //   numberOfEvents: 32,
  //   currentLocation: undefined,
  // };

  updateNumberOfEvents(eventNumber) {
    const { locations, numberOfEvents } = this.state;
    this.setState({ numberOfEvents: eventNumber });
    this.updateEvents(locations, numberOfEvents);
  }

  //here I used slice to obtain an array of event whose length = numberOfEvents
  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberOfEvents),
          currentLocation: location,
        });
      }
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
          updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)}
          numberOfEvents={this.state.numberOfEvents}
        />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.numberOfEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
