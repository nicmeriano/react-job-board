import { keyframes } from 'styled-components';

export const bounce = keyframes`
  from {transform: translateY(0);}
  to {transform: translateY(10px);}

`;

export const oscillate = keyframes`
  0% {transform: rotateY(0deg);}
  50% {transform: rotateY(80deg);}
  75% {transform: rotateY(0deg);}
  100% {transform: rotateY(-80deg);}
`;
