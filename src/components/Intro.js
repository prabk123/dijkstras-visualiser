import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "shards-react";
import Avatar from "../media/avatar-nb.png";
import MainVisualise from "../media/dijkstras-visualiser.mp4";
import DrawPath from "../media/draw-path.mp4";
import GenerateMaze from "../media/generate-maze.mp4";
import Video from "./Video";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, slide: 0 };
  }

  toggle = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  handleNext = () => {
    if (this.state.slide === 2) return this.toggle();
    this.setState(prevState => {
      return { slide: prevState.slide + 1 };
    });
  };

  handlePrevious = () => {
    this.setState(prevState => {
      return { slide: prevState.slide - 1 };
    });
  };

  getSlide = () => {
    let title;
    let slide;
    switch (this.state.slide) {
      case 0:
        title = (
          <div className="row p-3 m-0">
            <div className="col-12 feature d-flex align-items-center m-0">
              <img src={Avatar} className="avatar mr-4" alt="Avatar" />
              <div className="speech-wrapper load-hidden reveal-right">
                <div className="speech-pointer"></div>
                <div className="speech-container shadow d-block d-md-flex justify-content-between align-items-center">
                  <h4 className="m-0 text-left">
                    Welcome to the Dijkstra's Algorithm Visualiser!
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p>
              Dijkstra's algorithm is a way of finding the shortest path between
              nodes in a graph. This application is built with react and
              visualises how the algorithm visits nodes before determining the
              shortest way of getting from a start node to an end node. This
              tutorial will quickly overview the features of this application.
            </p>
            <Video video={MainVisualise} />
            <p>
              If you want to dive right in, feel free to press the "Skip
              Tutorial" button below. Otherwise, press "Next"!
            </p>
          </>
        );
        break;
      case 1:
        title = (
          <div className="row p-3 m-0">
            <div className="col-12 feature d-flex align-items-center m-0">
              <img src={Avatar} className="avatar mr-4" alt="Avatar" />
              <div className="speech-wrapper load-hidden reveal-right">
                <div className="speech-pointer"></div>
                <div className="speech-container shadow d-block d-md-flex justify-content-between align-items-center">
                  <h4 className="m-0 text-left">Draw Walls</h4>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p className="mb-5">
              Draw walls onto the grid to create barriers that the algorithm
              should not pass through. You can do this by clicking on the grid
              item you'd like to start at and dragging your mouse over the nodes
              you'd like to make walls.
            </p>
            <Video video={DrawPath} />
          </>
        );
        break;
      case 2:
        title = (
          <div className="row p-3 m-0">
            <div className="col-12 feature d-flex align-items-center m-0">
              <img src={Avatar} className="avatar mr-4" alt="Avatar" />
              <div className="speech-wrapper load-hidden reveal-right">
                <div className="speech-pointer"></div>
                <div className="speech-container shadow d-block d-md-flex justify-content-between align-items-center">
                  <h4 className="m-0 text-left">Generate a maze</h4>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p>
              Click on "Generate Maze in the menu bar to automatically create a
              recurively generated maze. You can also clear the entire grid and
              clear the visualised path by using the other menu items."
            </p>
            <Video video={GenerateMaze} />
          </>
        );
        break;
      default:
        title = (
          <div className="row p-3 m-0">
            <div className="col-12 feature d-flex align-items-center m-0">
              <img src={Avatar} className="avatar mr-4" alt="Avatar" />
              <div className="speech-wrapper load-hidden reveal-right">
                <div className="speech-pointer"></div>
                <div className="speech-container shadow d-block d-md-flex justify-content-between align-items-center">
                  <h4 className="m-0 text-left">
                    Welcome to the Dijkstra's Algorithm Visualiser!
                  </h4>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p>
              Dijkstra's algorithm is a way of finding the shortest path between
              nodes in a graph. This application is built with react and
              visualises how the algorithm visits nodes before determining the
              shortest way of getting from a start node to an end node. This
              tutorial will quickly overview the features of this application.
            </p>
            <video
              className="w-100 my-4 d-block mx-auto shadow"
              style={{ maxWidth: "400px" }}
              autoPlay
              muted
              loop
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>
              If you want to dive right in, feel free to press the "Skip
              Tutorial" button below. Otherwise, press "Next"!
            </p>
          </>
        );
        break;
    }

    return { title, slideNumber: slide };
  };

  render() {
    const { open, slide } = this.state;
    const { title, slideNumber } = this.getSlide();
    return (
      <div>
        <Modal
          open={open}
          size="lg"
          centered={true}
          backdrop={true}
          backdropClassName="backdrop"
          toggle={this.toggle}
        >
          <ModalHeader tag={"div"} style={{ background: "rgb(14, 105, 148)" }}>
            {title}
          </ModalHeader>
          <ModalBody>{slideNumber}</ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <button
              className="btn btn-pill btn-lg btn-light"
              onClick={this.toggle}
            >
              Skip Tutorial
            </button>
            <div>
              <button
                className="btn btn-pill btn-lg btn-light mr-2"
                disabled={slide === 0 ? true : false}
                onClick={this.handlePrevious}
              >
                Previous
              </button>
              <button
                className="btn btn-pill btn-lg btn-primary"
                onClick={this.handleNext}
              >
                {slide === 2 ? "Dive In!" : "Next"}
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Intro;
