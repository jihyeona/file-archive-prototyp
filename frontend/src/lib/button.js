import React from 'react'
import styled from 'styled-components/macro'
import { MovingBackground } from 'lib/headline'
import { ImgWrapper } from 'lib/container'

export const AnimationButton = styled.button`
background-size: 200% 200%;
background-image: linear-gradient(270deg, #647DEE,#7F53AC);
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
cursor:pointer;
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
`
export const Plus = styled.img`
  align-self: center;
`
export const ReadButton = styled.button`
height: 1.5em;
width: 1.5em;
border: none;
color: gray;
flex-direction: row;
display:flex;
`
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
`
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
`
export const ButtonInput = styled.button`
  color: #4f4f4f;
  background: #adbce6;
  text-align: center;
  font-size: 0.825rem;
  height: 2.5em;
  margin: 1em;
  border-radius: 250px;
  border:none;
  cursor: pointer;
  &:hover {
    background: #adbce6;
    color: white;
  }
`
export const ProfileImageButton = styled.button`
  color: #4f4f4f;
  background: #adbce6;
  text-align: center;
  font-size: 0.825rem;
  height: 2.5em;
  margin: 1em;
  border-radius: 250px;
  border:none;
  cursor: pointer;
  &:hover {
    background: #adbce6;
    color: white;
  }
  @media (min-width: 668px) and (max-width: 1023px) {
    margin: 1.2em 0em 0em 4em;
  }
  @media (min-width: 1024px) {
    margin: 1.5em 0em 0em 5em;
  }
`
export const ToggleButton = styled.button`
 color: #4f4f4f;
 background: #adbce6;
 text-align: center;
 font-size: 0.825rem;
 height: 2.5em;
 margin: 1em;
 border-radius: 250px;
 border:none;
 bottom: 15px;
 right: 15px;
 cursor: pointer;
 &:hover {
  background: #adbce6;
  color: white;
  }
`
// update profile picture button, in the desktop: margin-left: 5em; margin-top: 1.6em;

export const Button = ({ title }) => {
  return (
    <ButtonInput>
      {title}
    </ButtonInput>
  )
}
export const ImageButton = ({ title }) => {
  return (
    <ProfileImageButton>
      {title}
    </ProfileImageButton>
  )
}