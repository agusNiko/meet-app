import React, { Component } from "react";
import "./style.css";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: "",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      this.setState({
        infoText: "Please write a number",
        numberOfEvents: value,
      });
    } else if (value < 1 || value > 32) {
      this.setState({
        infoText: "Please select a number from 1 to 32",
        numberOfEvents: value,
      });
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: "",
      });
      this.props.updateNumberOfEvents(event.target.value);
    }
  };

  render() {
    const numberOfEvents = this.state.numberOfEvents;
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.infoText} ClassName="ErrorAlert" />
        <input
          type="text"
          className="EventsNumber"
          value={numberOfEvents}
          onChange={(e) => this.handleInputChanged(e)}
        />
        <label>Select Number of Events</label>
      </div>
    );
  }
}
export default NumberOfEvents;
