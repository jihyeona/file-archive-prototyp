import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { LikeThumbs } from 'lib/images'

export const Register = styled.p`
  color: #262626;
  text-align: center;
`
export const ProfileMessage = styled.p`
  color: #262626;
  text-align: center;
  font-size: 1.2em;
  margin-top: 2em;
`
export const ProfileText = styled.p`
  color: #4f4f4f;
  font-size: 0.825rem;
  margin-top: 1em;
  @media (min-width: 668px) {
    margin-top: 2em;
  }  
`
export const Title = styled.h1`
background-color: blue; 
padding: 2em 3em;
margin-top: 0;
color: white;
text-align: center;
font-size: 1.2em;
text-transform: uppercase;
border-radius: 6px 6px 0 0;
`
export const ThemeTitle = styled.h1`
font-family: "Roboto", sans-serif;
color: #262626;
text-transform: uppercase;
display: flex;
text-align: center;
justify-self: center;
text-transform: uppercase;
font-size: 1.4em;
font-weight: 400;
text-decoration: none;
top: 25%;
left: 7%;
position: absolute;
color: #fafafa;
flex: 1;
overflow-wrap: break-word;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
@media (min-width: 668px) { 
  width: 80%; 
  display: flex; 
  justify-content: center; 
  font-size: 2em;
  top: 20%;
  left: 10%;
}
`
export const PollTitle = styled.h1`
display: flex;
text-align: center;
justify-self: center;
text-transform: uppercase;
font-size: 1.4em;
font-weight: 400;
text-decoration: none;
color: #232b2b;
flex: 1;
overflow-wrap: break-word;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
margin: 1.5em 0em;
@media (min-width: 668px) { 
  width: 100%; 
  display: flex; 
  justify-content: center; 
  font-size: 2em;
}
`
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
`
export const AboutText = styled.p`
display: flex;
text-align: left;
justify-self: center;
font-size: 0.98em;
font-weight: 300;
padding: 0.2em 3em;
line-height: 1.4;
text-decoration: none;
color: #232b2b;
flex: 1;
overflow-wrap: break-word;
text-overflow: ellipsis;
@media (min-width: 668px) { 
  display: flex; 
  justify-content: center; 
  font-size: 1.5em;
  line-height: 1.6;
  padding: 0.9em 7em;
}
`
export const ThumbText = styled.p`
position: absolute;
display: none;
top: 30%;
padding-left: 1em;
color: white;
background: none;
border: none;
font-size: 1.5em;
font-weight: 400;
cursor: pointer;
${LikeThumbs}:hover & {
  display: block;
}
`
export const MovingBackground = keyframes`
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}
`
export const AnimationTitle = styled.h1`
background-size: 200% 200%;
background-image: linear-gradient(270deg, #647DEE,#7F53AC);
animation: ${MovingBackground} 15s ease infinite;
padding: 2em 3em;
margin-top: 0;
color: white;
text-align: center;
font-size: 1.2em;
text-transform: uppercase;
border-radius: 6px 6px 0 0;
`
export const Headline = ({ title }) => {
  return (
    <AnimationTitle>
      {title}
    </AnimationTitle>
  )
}