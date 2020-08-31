import React from 'react';
import styled from 'styled-components/macro';
import { MovingBackground } from 'lib/headline';
import { ImgWrapper } from 'lib/container';

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
export const Plus = styled.img`
  align-self: center;
`;
export const ReadButton = styled.button`
  height: 1.5em;
  width: 1.5em;
  border: none;
  color: gray;
  flex-direction: row;
  display: flex;
`;
export const ProfileImgButton = styled.button`
  position: absolute;
  display: none;
  top: 30%;
  z-index: 5;
  color: white;
  background: none;
  border: none;
  padding: 10px;
  font-size: 12px;
  overflow-wrap: break-word;
  cursor: pointer;
  ${ImgWrapper}:hover & {
    display: block;
  }
  @media (min-width: 668px) {
    position: absolute;
    display: none;
    top: 15%;
    margin-left: 2.4em;
    z-index: 5;
    color: white;
    background: none;
    border: none;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;
export const LinkText = styled.button`
  position: absolute;
  top: 20%;
  z-index: 5;
  color: white;
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  ${ImgWrapper}:hover & {
    display: block;
  }
  @media (min-width: 668px) {
    top: 40%;
    left: 20%;
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
