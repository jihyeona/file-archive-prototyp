import styled from 'styled-components/macro'
import { ImgWrapper } from 'lib/container'

export const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  ${ImgWrapper}:hover & {
    filter: brightness(20%);
  }
  @media (min-width: 668px) { 
    width: 170px;
    height: 170px;
    margin-left: 3em;
    margin-top: -2.3em;
  }
`
export const Thumbnail = styled.img`
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  ${ImgWrapper}:hover & {
    filter: brightness(20%);
  }
  @media (min-width: 668px) { 
    width: 266px;
    height: 266px; 
  }
`

export const ThemeImage = styled.img`
  width: 100%;
  height: 10rem;
  display: block;
  object-fit: cover;
  position: relative;
  filter: brightness(80%);
  @media (min-width: 668px) { 
    width: 60%; 
  }
`

export const SmallImage = styled.img`
  width: 33.3%;
  height: -webkit-fill-available; 
  object-fit: cover;
  ${ImgWrapper}:hover & {
    filter: brightness(20%);
  }
  @media (min-width: 668px) {
    width: 20%;
    height: -webkit-fill-available;
    min-height: 12em; 
  }
`
export const LikeThumbs = styled.div`
  background-image: url(${props => props.img});
  background-size: cover;
  width: 100%;
  height: 100%;
  display: block;
  &:hover {
    filter: brightness(80%);
  }
`
