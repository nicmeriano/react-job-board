import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = this.animateLoader(text, speed);

    this.setState({ content: text });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  animateLoader = (text, speed) => {
    const { content } = this.state;
    return setInterval(() => {
      if (content === `${text}...`) {
        this.setState({ content: text });
      } else {
        this.setState(() => ({
          content: `${content}.`,
        }));
      }
    }, speed);
  };

  render() {
    const { content } = this.state;
    return <p style={styles.content}>{content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};
