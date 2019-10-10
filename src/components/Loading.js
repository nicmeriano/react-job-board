import React, { Component } from 'react';
import styled from 'styled-components';
import { H2 } from '../styles/Text';
import { bounce, oscillate } from '../styles/Animate';

const Ball = styled.div`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background: ${props => props.theme.primary};
  border-radius: 50%;
  margin: 0 2px;
  animation: ${bounce} ${props => `${props.time}s`} infinite alternate;
  animation-delay: ${props => `${props.delay}s`};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

const Letter = styled(H2)`
  animation: ${oscillate} 2s ease-in alternate infinite;
  animation-delay: ${props => `${props.delay}s`};
`;

function BouncingBalls({ options: { time, size } }) {
  return (
    <Wrapper>
      <Ball time={time} size={size} delay={0} />
      <Ball time={time} size={size} delay={0.15} />
      <Ball time={time} size={size} delay={0.3} />
    </Wrapper>
  );
}

function FlipText({ options: { text } }) {
  const letters = text.split('');
  return (
    <Wrapper>
      {letters.map((letter, i) => {
        const key = `${letter}-${i}`;

        return (
          <Letter key={key} delay={i / 10}>
            {letter}
          </Letter>
        );
      })}
    </Wrapper>
  );
}

export default class Loading extends Component {
  constructor(props) {
    super(props);
    const { time, size, text } = this.props;
    this.state = {
      selectedLoader: 'balls',
      loaders: {
        balls: <BouncingBalls options={{ time, size }} />,
        flipText: <FlipText options={{ text, time, size }} />,
      },
    };
  }

  componentDidMount() {
    const { variant } = this.props;
    const { loaders } = this.state;
    if (variant in loaders) {
      this.selectLoader(variant);
    }
  }

  selectLoader = selectedLoader => {
    this.setState({ selectedLoader });
  };

  render() {
    const { selectedLoader, loaders } = this.state;
    return <>{loaders[selectedLoader]}</>;
  }
}
