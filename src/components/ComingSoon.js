import React from 'react';
import styled from 'styled-components';
import { H1 } from '../styles/Text';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 3px;
  flex-direction: column;
`;

const Title = styled(H1)`
  font-size: 3rem;
  color: ${props => props.theme.primary};
  text-align: center;
`;

export default function ComingSoon() {
  return (
    <Wrapper>
      <Box>
        <Title as="h2">Coming Soon</Title>
      </Box>
    </Wrapper>
  );
}
