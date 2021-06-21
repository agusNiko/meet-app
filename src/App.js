import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import CitySearch from "./CitySearch";
import { WarningAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
// import { mockData } from "./mock-data";
import "./style.css";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentCity: "all",
    infoText: "",
    showWelcomeScreen: undefined,
  };

  updateEvents = (location, numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events.slice(0, numberOfEvents)
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberOfEvents),
          currentCity: location,
          //locations: [location],
        });
      }
    });
  };

  //I this function will update tbe number of events of app.state fom <NumberOfEvents>
  updateNumberOfEvents(eventNumber) {
    this.setState({ numberOfEvents: eventNumber });
    const { currentCity } = this.state;
    this.updateEvents(currentCity, eventNumber);
  }

  async componentDidMount() {
    const { numberOfEvents } = this.state;
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
      if (!navigator.onLine) {
        this.setState({
          infoText:
            "Internet connection not detected, previously loaded events are displayed",
        });
      } else {
        this.setState({
          infoText: "",
        });
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <h1>MEET APP</h1>
        <NumberOfEvents
          updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)}
        />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <WarningAlert text={this.state.infoText} className="InfoAlert" />
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
