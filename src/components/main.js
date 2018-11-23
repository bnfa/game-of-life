import React from "react";
import "../index.css";
import Grid from "./grid";
import Buttons from "./buttons";
import _ from "lodash";

export default class Main extends React.Component {
  constructor() {
    super();
    this.speed = 500;
    this.cols = 50;
    this.rows = 30;

    this.running = false;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    };
  }

  selectBox = (row, column) => {
    let gridCopy = _.clone(this.state.gridFull);
    gridCopy[row][column] = !gridCopy[row][column];
    this.setState({
      gridFull: gridCopy
    });
  };

  seed = () => {
    let gridCopy = _.clone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
      this.setState({
        gridFull: gridCopy
      });
    }
  };

  playButton = () => {
    this.running = true;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
    this.running = false;
  };

  clear = () => {
    if (this.running) this.pauseButton();
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = _.clone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
  };

  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Life Cycle: {this.state.generation}</h2>
      </div>
    );
  }
}
