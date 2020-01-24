import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "shards-react";
import Avatar from "../media/avatar-nb.png";
import Video from "../media/dijkstras-visualiser.mp4";

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
                  <h2 className="m-0 text-left">
                    Welcome to the Dijkstra's Algorithm Visualiser!
                  </h2>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p>
              This tutorial will quickly overview the features of this
              application.
            </p>
            <video
              className="w-75 my-4 d-block mx-auto shadow"
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
      case 1:
        title = (
          <div className="row p-3 m-0">
            <div className="col-12 feature d-flex align-items-center m-0">
              <img src={Avatar} className="avatar mr-4" alt="Avatar" />
              <div className="speech-wrapper load-hidden reveal-right">
                <div className="speech-pointer"></div>
                <div className="speech-container shadow d-block d-md-flex justify-content-between align-items-center">
                  <h2 className="m-0 text-left">Dijkstra's Algorithm</h2>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p className="mb-5">
              There are 6 algorithms being compared. Below is a breif overview
              of each algorith and how they work:
            </p>
            <h5>Bubble Sort</h5>
            <p>
              Bubble sort itterates through each item in the array checking the
              i<sup>th</sup> item and the i+1 item in the array. If the i
              <sup>th</sup> item is larger than the i+1 item then the array
              items are swapped. This causes the largest item in the array to
              bubble up to the end. Hence the name of the algorithm. This is
              then repeated until the array is sorted. Bubble sort has a time
              complexity of O(n<sup>2</sup>).
            </p>
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
                  <h2 className="m-0 text-left">Features</h2>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p>
              This tutorial will quickly overview the features of this
              application and the different sorting algorithms that are being
              compared.
            </p>

            <p>
              If you want to dive right in, feel free to press the "Skip
              Tutorial" button below. Otherwise, press "Next"!
            </p>
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
                  <h2 className="m-0 text-left">
                    Welcome to the Sorting Algorithm Visualiser!
                  </h2>
                </div>
              </div>
            </div>
          </div>
        );
        slide = (
          <>
            <p>
              This tutorial will quickly overview the features of this
              application and the different sorting algorithms that are being
              compared.
            </p>

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
