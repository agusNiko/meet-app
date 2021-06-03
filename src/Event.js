import React, { Component } from "react";

import { mockData } from "./mock-data";

class Event extends Component {
  state = {
    summary: "",
    description: "",
    location: "",
    date: "",
    timeZone: "",
    show: false,
  };

  handleButton = () => {
    this.setState = { show: !this.state.show };
  };

  render() {
    return (
      <div className="Event">
        <h1 className="EventSummary">{this.state.summary}</h1>
        <h1 className="EventLocation">{this.state.location}</h1>
        <h1 className="EventDate">
          {this.state.date + "/" + this.state.timeZone}
        </h1>
        {this.state.show === true && (
          <p className="EventDetails">{this.state.description}</p>
        )}

        <button className="showMoreLess" onClick={() => this.handleButton()}>
          Show more-less
        </button>
      </div>
    );
  }
}
export default Event;
