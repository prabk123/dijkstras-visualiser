import React, { Component } from "react";

class Video extends Component {
  render() {
    return (
      <React.Fragment key={this.props.video}>
        <video
          ref="video"
          className="w-100 my-4 d-block mx-auto shadow"
          style={{ maxWidth: "400px" }}
          autoPlay
          muted
          loop
        >
          <source src={this.props.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </React.Fragment>
    );
  }
}

export default Video;
