import React, { Component } from "react";
import "./style.css";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value,
    });
  };

  render() {
    const numberOfEvents = this.state.numberOfEvents;
    return (
      <div className="numberOfEvents">
        <form>
          <label for="fname"> Number of Events:</label>
          <input
            type="text"
            className="EventsNumber"
            value={numberOfEvents}
            onChange={this.handleInputChanged}
          />
        </form>
      </div>
    );
  }
}
export default NumberOfEvents;
