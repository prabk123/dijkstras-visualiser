import React, { Component } from "react";
import Avatar from "../avatar-nb.png";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    const {
      start,
      animating,
      resetPath,
      clearGrid,
      generateMaze,
      isMaze
    } = this.props;
    // const { disabled } = this.state;
    return (
      <Navbar
        type="dark"
        expand="md"
        className="text-left"
        style={{ background: "rgb(14, 105, 148)" }}
      >
        <NavbarBrand className="p-0 d-flex">
          <img src={Avatar} alt="Avatar" className="avatar mr-3" />
          <div>
            <h4 className="m-0 text-scale text-white font-weight-bold">
              Dijkstra's Algorithm Visualiser
            </h4>
            <h5 className="m-0 text-scale text-white font-weight-bold">
              Prabodh Kakodkar
            </h5>
            {/* <h6 className="m-0 text-scale text-white">Check out my other projects on <a href="https://www.prabodhkakodkar.com" target="_blank" className="custom-link">my webiste →</a></h6> */}
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar></Nav>
          <Nav navbar className="ml-auto align-items-center">
            <NavItem>
              <NavLink>
                <button
                  className="btn btn-pill btn-light text-dark m-0"
                  disabled={animating || isMaze}
                  onClick={generateMaze}
                >
                  <i className="fas fa-magic mr-2"></i>Generate Maze
                </button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <button
                  className="btn btn-pill btn-light text-dark m-0"
                  disabled={animating}
                  onClick={clearGrid}
                >
                  <i className="fas fa-chess-board mr-2"></i>Clear Grid
                </button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <button
                  className="btn btn-pill btn-light text-dark m-0"
                  disabled={animating}
                  onClick={resetPath}
                >
                  <i className="fas fa-redo-alt mr-2"></i>Reset Path
                </button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <button
                  className="btn btn-pill btn-light text-dark m-0"
                  disabled={animating}
                  onClick={start}
                >
                  <i className="fas fa-play mr-2"></i>Start Visualiser
                </button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
