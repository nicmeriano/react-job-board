import styled, { css } from 'styled-components';
import { Theme } from './Theme';

export const fontStack = css`
  font-family: 'Be Vietnam', sans-serif;
`;

export const H1 = styled.h1`
  ${fontStack};
  color: ${Theme.text.default};
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.3;
  margin: 0;
  padding: 0;
`;

export const H2 = styled.h2`
  color: ${Theme.text.default};
  ${fontStack};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.3;
  margin: 0;
  padding: 0;
`;

export const H3 = styled.h3`
  color: ${Theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`;

export const H4 = styled.h4`
  color: ${Theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const H5 = styled.h5`
  color: ${Theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const H6 = styled.h6`
  color: ${Theme.text.default};
  ${fontStack};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.675rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`;
