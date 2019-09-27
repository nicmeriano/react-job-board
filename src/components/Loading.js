import React, { Component } from 'react';
import styled from 'styled-components';
import { H2 } from '../styles/Text';
import { bounce, oscillate } from '../styles/Animate';

const Ball = styled.div`
  height: 10px;
  width: 10px;
  background: ${props => props.theme.primary};
  border-radius: 50%;
  margin: 0 2px;
  animation: ${bounce} 1.5s ease infinite;
  animation-delay: ${props => `${props.delay}s`};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem 0;
`;

const Letter = styled(H2)`
  animation: ${oscillate} 2s ease-in infinite;
  animation-delay: ${props => `${props.delay}s`};
`;

function BouncingBalls() {
  return (
    <Wrapper>
      <Ball delay={0} />
      <Ball delay={0.15} />
      <Ball delay={0.3} />
    </Wrapper>
  );
}

function FlipText({ text = 'Loading' }) {
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

const loaders = {
  balls: <BouncingBalls />,
  flipText: <FlipText />,
};

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLoader: 'balls',
    };
  }

  componentDidMount() {
    const { variant } = this.props;
    if (variant in loaders) {
      this.selectLoader(variant);
    }
  }

  selectLoader = selectedLoader => {
    this.setState({ selectedLoader });
  };

  render() {
    const { selectedLoader } = this.state;
    return <>{loaders[selectedLoader]}</>;
  }
}
