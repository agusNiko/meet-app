import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventShown: "32",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      eventShown: value,
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="EventsNumber"
          value={this.state.eventShown}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
