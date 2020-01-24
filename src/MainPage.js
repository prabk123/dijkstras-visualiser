import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Node from "./components/Node";
import "./MainPage.css";
import { dijkstras, shortestPath } from "./algorithms/dijkstras";
import { recursiveDivision } from "./algorithms/mazeGenerator";
import Intro from "./components/Intro";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startPressed: false,
      finishPressed: false,
      animating: false,
      isMaze: false
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown = (row, col, isStart, isFinish) => {
    if (this.state.animating) return;
    let newGrid;
    let startPressed;
    let finishPressed;
    if (isStart) {
      newGrid = changeStart(this.state.grid, row, col);
      startPressed = true;
      finishPressed = false;
    } else if (isFinish) {
      newGrid = changeFinish(this.state.grid, row, col);
      startPressed = false;
      finishPressed = true;
    } else {
      newGrid = toggleWall(this.state.grid, row, col);
      startPressed = false;
      finishPressed = false;
    }
    this.setState({
      grid: newGrid,
      mouseIsPressed: true,
      startPressed,
      finishPressed
    });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    if (this.state.animating) return;
    let newGrid;
    if (this.state.startPressed) {
      newGrid = changeStart(this.state.grid, row, col);
    } else if (this.state.finishPressed) {
      newGrid = changeFinish(this.state.grid, row, col);
    } else {
      newGrid = toggleWall(this.state.grid, row, col);
    }
    this.setState({ grid: newGrid });
  };

  handleMouseUp = () => {
    if (this.state.animating) return;
    this.setState({
      mouseIsPressed: false,
      startPressed: false,
      finishPressed: false
    });
  };

  animateDijkstra = async (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        await this.wait(10);
        this.animateShortestPath(nodesInShortestPathOrder);
        return;
      }
      const node = visitedNodesInOrder[i];
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.add("node-visited");
      await this.wait(5);
    }
  };

  animateShortestPath = async nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.remove("node-visited");
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.add("node-shortest-path");
      await this.wait(50);
    }
    this.setState({ animating: false });
  };

  visualizeDijkstra = () => {
    const { grid } = this.state;
    let startNode;
    let finishNode;
    for (let r in grid) {
      for (let c in grid[r]) {
        if (grid[r][c].isStart) {
          startNode = grid[r][c];
        }
        if (grid[r][c].isFinish) {
          finishNode = grid[r][c];
        }
      }
    }
    const visitedNodes = dijkstras(grid, startNode, finishNode);
    const path = shortestPath(finishNode);
    this.setState({ animating: true });
    this.animateDijkstra(visitedNodes, path);
  };

  visualizeMaze = () => {
    this.clearGrid();
    let grid = JSON.parse(JSON.stringify([...this.state.grid]));
    const { walledNodes, newGrid } = recursiveDivision(grid);
    this.setState({ animating: true });
    this.animateMaze(walledNodes, newGrid);
  };

  animateMaze = async (walledNodes, newGrid) => {
    for (let i = 0; i < walledNodes.length; i++) {
      const node = walledNodes[i];
      if (!node.isWall) {
        console.log(node.row, node.col);
        continue;
      }
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.add("wall-animate");
      await this.wait(3);
    }
    await this.wait(100);
    this.setState({ grid: newGrid, animating: false, isMaze: true });
  };

  resetPath = () => {
    let grid = this.state.grid.slice();
    for (let r in grid) {
      for (let c in grid[r]) {
        let node = document.getElementById(`node-${r}-${c}`);
        node.classList.remove("node-visited");
        node.classList.remove("node-shortest-path");
        grid[r][c].distance = Infinity;
        grid[r][c].previousNode = null;
        grid[r][c].isVisited = false;
        if (grid[r][c].isStart) node.classList.add("node-start");
        if (grid[r][c].isFinish) node.classList.add("node-finish");
      }
    }
    this.setState({ grid });
  };

  resetWalls = () => {
    let grid = this.state.grid.slice();
    for (let r in grid) {
      for (let c in grid[r]) {
        let node = document.getElementById(`node-${r}-${c}`);
        node.classList.remove("node-visited");
        node.classList.remove("node-shortest-path");
        node.classList.remove("node-wall");
        node.classList.remove("wall-animate");
        grid[r][c].distance = Infinity;
        grid[r][c].previousNode = null;
        grid[r][c].isVisited = false;
        grid[r][c].isWall = false;
        if (grid[r][c].isStart) node.classList.add("node-start");
        if (grid[r][c].isFinish) node.classList.add("node-finish");
      }
    }
    this.setState({ grid });
  };

  clearGrid = () => {
    let grid = this.state.grid.slice();
    for (let r in grid) {
      for (let c in grid[r]) {
        let node = document.getElementById(`node-${r}-${c}`);
        node.classList.remove("node-visited");
        node.classList.remove("node-shortest-path");
        node.classList.remove("node-wall");
        node.classList.remove("wall-animate");
        grid[r][c].distance = Infinity;
        grid[r][c].previousNode = null;
        grid[r][c].isVisited = false;
        grid[r][c].isWall = false;
        grid[r][c].isStart = false;
        grid[r][c].isFinish = false;
      }
    }
    grid[START_NODE_ROW][START_NODE_COL].isStart = true;
    document
      .getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`)
      .classList.add("node-start");
    grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;
    document
      .getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`)
      .classList.add("node-finish");
    this.setState({ grid, isMaze: false });
  };

  wait = async milliseconds => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, milliseconds);
    });
  };

  render() {
    const { grid, mouseIsPressed, animating, isMaze } = this.state;
    return (
      <div>
        <Intro />
        <NavBar
          generateMaze={this.visualizeMaze}
          clearGrid={this.clearGrid}
          resetWalls={this.resetWalls}
          resetPath={this.resetPath}
          animating={animating}
          start={this.visualizeDijkstra}
          isMaze={isMaze}
        />
        <div className="dark-back">
          <div className="container-fluid p-3 pl-5">
            <h6 className="text-white mb-0">
              <i className="fas fa-file-code mr-2"></i> Check out my other
              projects on{" "}
              <a
                href="https://www.prabodhkakodkar.com/personal-projects"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-link"
              >
                my webiste →
              </a>
            </h6>
          </div>
        </div>
        <div className="bg-light d-flex p-4 align-items-center justify-content-center">
          <h5 className="m-0 font-weight-bold">Key:</h5>
          <div
            className="ml-5"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              position: "relative",
              background: "#fff"
            }}
          >
            <i
              className="fas fa-chevron-right"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate3D(-50%, -50%, 0)",
                fontSize: "1.5em",
                color: "green"
              }}
            ></i>
          </div>
          <h6 className="font-weight-light mb-0 ml-3">Start</h6>
          <div
            className="ml-5"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              position: "relative",
              background: "#fff"
            }}
          >
            <i
              className="fas fa-bullseye"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate3D(-50%, -50%, 0)",
                fontSize: "1.5em",
                color: "red"
              }}
            ></i>
          </div>
          <h6 className="font-weight-light mb-0 ml-3">Finish</h6>
          <div
            className="ml-5"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              position: "relative",
              background: "#fff"
            }}
          ></div>
          <h6 className="font-weight-light mb-0 ml-3">Unvisited</h6>
          <div
            className="ml-5"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              position: "relative",
              background: "rgb(14, 105, 148)"
            }}
          ></div>
          <h6 className="font-weight-light mb-0 ml-3">Visited</h6>
          <div
            className="ml-5"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              position: "relative",
              background: "rgb(255, 254, 106)"
            }}
          ></div>
          <h6 className="font-weight-light mb-0 ml-3">Shortest Path</h6>
          <div
            className="ml-5"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              position: "relative",
              background: "#003148"
            }}
          ></div>
          <h6 className="font-weight-light mb-0 ml-3">Wall</h6>
        </div>
        <div id="grid">
          <table>
            <tbody>
              {grid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const { row, col, isFinish, isStart, isWall } = node;
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onMouseDown={this.handleMouseDown}
                          onMouseEnter={this.handleMouseEnter}
                          onMouseUp={this.handleMouseUp}
                          row={row}
                        ></Node>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 23; row++) {
    const currentRow = [];
    for (let col = 0; col < 55; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const toggleWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const changeStart = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  for (let r in newGrid) {
    for (let c in newGrid[r]) {
      newGrid[r][c].isStart = false;
    }
  }
  const newNode = {
    ...node,
    isStart: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
const changeFinish = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  for (let r in newGrid) {
    for (let c in newGrid[r]) {
      newGrid[r][c].isFinish = false;
    }
  }
  const newNode = {
    ...node,
    isFinish: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default MainPage;
