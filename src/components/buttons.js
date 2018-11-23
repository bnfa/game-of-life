import React from "react";

export default class Buttons extends React.Component {
  render() {
    return (
      <div className="btn-row">
        <button className="btn btn-play" onClick={this.props.playButton}>
          Play
        </button>
        <button className="btn btn-pause" onClick={this.props.pauseButton}>
          Pause
        </button>
        <button className="btn btn-clear" onClick={this.props.clear}>
          Clear
        </button>
        <button className="btn btn-seed" onClick={this.props.seed}>
          Seed
        </button>
      </div>
    );
  }
}
