import React from "react";

class GameDisplay extends React.Component {
  render() {
    return (
      <div className="display-container">
        <div className="countDisplay">
          {this.props.turnCount < 1 ? "--" : this.props.turnCount}
        </div>
        <div className="start-button" onClick={this.props.restartGame}>
          Start
        </div>
        <div
          id="strict"
          className="strict-button"
          onClick={this.props.enableStrict}
        >
          Strict
        </div>
      </div>
    );
  }
}

export default GameDisplay;
