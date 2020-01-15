import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    const content = isFinish ? (
      <i className="fas fa-bullseye" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate3D(-50%, -50%, 0)", fontSize: '1.5em' }}></i>
    ) : isStart ? (
      <i className="fas fa-chevron-right" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate3D(-50%, -50%, 0)", fontSize: '1.5em' }}></i>
    ) : null;
    return (
      <td
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col, isStart, isFinish)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        {content}
      </td>
    );
  }
}
