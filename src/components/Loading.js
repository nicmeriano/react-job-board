import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: 0,
    right: 0,
    marginTop: "20px",
    textAlign: "center"
  }
};

export default class Loading extends Component {
  state = {
    content: this.props.text
  };
  componentDidMount() {
    const { text, speed } = this.props;
    this.interval = this.animateLoader(text, speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  animateLoader = (text, speed) => {
    return setInterval(() => {
      if (this.state.content === `${text}...`) {
        this.setState({ content: text });
      } else {
        this.setState(({ content }) => ({
          content: content + "."
        }));
      }
    }, speed);
  };

  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300
};
