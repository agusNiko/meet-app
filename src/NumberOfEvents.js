import React, { Component } from "react";
import "./style.css";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged(event) {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value,
    });
    this.props.updateNumberOfEvents(event.target.value);
  }

  render() {
    const numberOfEvents = this.state.numberOfEvents; //I don't need this here
    return (
      <div className="numberOfEvents">
        <form>
          <label htmlFor="fname"> Number of Events:</label>
          <input
            type="text"
            className="EventsNumber"
            value={this.props.numberOfEvents}
            onChange={(e) => this.handleInputChanged(e)}
          />
        </form>
      </div>
    );
  }
}
export default NumberOfEvents;
