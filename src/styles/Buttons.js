import styled from 'styled-components';

export const StyledButton = styled.button`
  cursor: pointer;
  background: ${props => (props.inverted ? 'transparent' : props.theme.primary)};
  font-size: 1rem;
  border-radius: 3px;
  color: ${props => (props.inverted ? props.theme.primary : 'white')};
  border: ${props => `2px solid ${props.theme.primary}`};
  transition: 0.1s all ease-out;
  font-weight: 500;

  &:hover {
    color: ${props => (props.inverted ? 'white' : props.theme.primary)};
    background: ${props => (props.inverted ? props.theme.primary : 'transparent')};
  }
`;
