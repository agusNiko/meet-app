import React, { Component } from "react";
import "./style.css";

import { mockData } from "./mock-data";

class Event extends Component {
  state = {
    show: false,
  };

  handleButton = () => {
    this.setState((prevState) => ({ show: !prevState.show }));
  };

  render() {
    let event = this.props.event;

    return (
      <div className="Event">
        <h1 className="EventSummary">{event.summary}</h1>
        <h2 className="EventLocation">{event.location}</h2>
        <h3 className="EventDate">
          start: {event.start.dateTime} - Time Zone: {event.start.timeZone}
        </h3>
        {this.state.show === true && (
          <p className="EventDetails">{event.description}</p>
        )}
        {this.state.show === false && (
          <button className="showMore" onClick={() => this.handleButton()}>
            Show details
          </button>
        )}
        {this.state.show === true && (
          <button className="showLess" onClick={() => this.handleButton()}>
            hide details
          </button>
        )}
      </div>
    );
  }
}
export default Event;
