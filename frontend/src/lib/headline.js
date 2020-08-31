import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

export const PollText = styled.h1`
  display: flex;
  text-align: center;
  justify-self: center;
  font-size: 1em;
  font-weight: 300;
  padding: 1em;
  text-decoration: none;
  color: #232b2b;
  flex: 1;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  @media (min-width: 668px) {
    display: flex;
    justify-content: center;
    font-size: 2em;
    top: 20%;
    left: 10%;
  }
`;

export const MovingBackground = keyframes`
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}
`;
export const AnimationTitle = styled.h1`
  background-size: 200% 200%;
  background-image: linear-gradient(270deg, #647dee, #7f53ac);
  animation: ${MovingBackground} 15s ease infinite;
  padding: 2em 3em;
  margin-top: 0;
  color: white;
  text-align: center;
  font-size: 1.2em;
  text-transform: uppercase;
  border-radius: 6px 6px 0 0;
`;
export const Headline = ({ title }) => {
  return <AnimationTitle>{title}</AnimationTitle>;
};
