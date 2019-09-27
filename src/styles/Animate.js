import { keyframes } from 'styled-components';

export const bounce = keyframes`
  0% {transform: translateY(0);}
  25% {transform: translateY(5px);}
  50% {transform: translateY(-5px);}
  75% {transform: translateY(5px);}
  100% {transform: translateY(-5px);}
`;

export const oscillate = keyframes`
  0% {transform: rotateY(0deg);}
  50% {transform: rotateY(80deg);}
  75% {transform: rotateY(0deg);}
  100% {transform: rotateY(-80deg);}
`;
