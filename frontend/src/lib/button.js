import React from 'react';
import styled from 'styled-components/macro';
import { MovingBackground } from 'lib/headline';

export const AnimationButton = styled.button`
  background-size: 200% 200%;
  background-image: linear-gradient(270deg, #647dee, #7f53ac);
  animation: ${MovingBackground} 15s ease infinite;
  position: fixed;
  border-radius: 500px;
  bottom: 15px;
  right: 15px;
  margin: 20vw 1vw;
  height: 50px;
  width: 50px;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.5, 1.5);
  }
  @media (min-width: 668px) and (max-width: 1023px) {
    height: 80px;
    width: 80px;
    margin: 2em;
    bottom: 27em;
  }
  @media (min-width: 1024px) {
    height: 80px;
    width: 80px;
    margin: 2em;
  }
`;

export const ButtonInput = styled.button`
  font: 400 13.3333px Arial;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
  background-color: -internal-light-dark-color(
    rgb(239, 239, 239),
    rgb(74, 74, 74)
  );
  text-align: center;
  margin-left: 0.6em;
  padding: 1px 6px;
  border-width: 2px;
  border-style: outset;
  border-color: -internal-light-dark-color(
    rgb(118, 118, 118),
    rgb(195, 195, 195)
  );
  border-image: initial;
  cursor: pointer;
  &:hover {
    background: #adbce6;
    color: white;
  }
`;
export const FormSubmit = styled.button`
  color: #4f4f4f;
  background: #adbce6;
  text-align: center;
  font-size: 0.825rem;
  height: 2.5em;
  margin: 1em;
  border-radius: 250px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #adbce6;
    color: white;
  }
`;

export const Button = ({ title }) => {
  return <ButtonInput>{title}</ButtonInput>;
};

export const FormButton = ({ title }) => {
  return <FormSubmit>{title}</FormSubmit>;
};
