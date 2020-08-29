import styled from 'styled-components/macro'

export const ItemRow = styled.div`
@media (min-width: 668px) { 
  display: flex;
  direction: row;
  justify-content: flex-start;
  flex-flow: wrap;
  margin: 2em 2em 2em 6.5em;
}
`
export const Row = styled.div`
direction: row;
display: flex;
flex-flow: column;
justify-items: center;
`
export const Column = styled.div`
  display: flex;
  direction: column;
  justify-align: center;
  min-height: -webkit-fill-available;
  @media (min-width: 668px) { 
    display: flex;
    direction: row;
    justify-content: center;
    flex-flow: wrap;
    min-height: auto;
  }
`
export const OverlayDiv = styled.div`
height: 270px;
witdh: 270px;
`
export const ThemeContainer = styled.div`
width: 100%;
text-decoration: none;
position: relative;
@media (min-width: 668px) { 
  display: flex; 
  justify-content: center; 
}
`

export const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ItemContainer = styled.div` 
width: 100%; 
border-radius: 3px; 
margin-bottom: 60px; 
@media (min-width: 668px) { 
  width: 266px; 
  border: 1px solid rgba(var(--b6a,219,219,219),1); 
} `

export const ItemText = styled.div`
margin-left: 0.5em;
overflow-wrap: break-word;
display: flex;
direction: row;
align-items: center;
justify-content: flex-start;
flex-flow: wrap;
@media (min-width: 668px) { 
  width: 90%;
} 
`
export const ItemDescription = styled.div`
margin-left: 0.5em;
overflow-wrap: break-word;
@media (min-width: 668px) { 
  width: 90%;
} 
`
export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 6px 6px;
  margin-top: 3.4em;
  margin-bottom: 1em;
  padding-bottom: 6em;
  height: calc(100vh - 30px)
  @media (min-width: 668px) and (max-width: 1023px) { 
   margin-top: 4em;
   margin-bottom: 15em;
   padding-bottom: 10em;
  } 
  @media (min-width: 1024px) {

  }
  
`
export const AddPollContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 6px 6px;
  margin-top: 3.4em;
  @media (min-width: 668px) {
   margin-top: 8em;
  } 
`
export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 6px 6px;
  margin-top: 3em;
  @media (min-width: 668px) { 
   justify-content: center;
   align-items: stretch;
   margin-top: 3em;
  } 
`
export const LikeContainer = styled.div`
  width: 100%;
  background: #fafafa;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-wrap: row wrap;
  border-radius: 6px 6px;
`
export const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 1em;
  margin-bottom: 1em;
  width: 90%;
  @media (min-width: 668px) { 
    justify-content: center;
    margin-top: 4em;
    width: 100%;
  }
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 668px) and (max-width: 1023px) { 
    margin: 2em 8em 2em 1em;
  }
  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 20vw;
  }
`
export const ProfilePicSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 668px) and (max-width: 1023px) { 
    margin: 3em 0em 2em 2em;
  }
  @media (min-width: 1024px) {
    margin-top: 0.8em;
  }
`
export const ToggleDiv = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 668px) { 
    justify-content: space-between;
    width: 100%;
    margin-left: 2em;
  }
`

export const ThemesDiv = styled.div`
  display: flex;
  background-color: none;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  @media (min-width: 668px) { 
    margin-top: 10em;
    margin-bottom: 8em;
  }
`
export const ProfileInfo = styled.div`
  width: 60%;
  margin: 1em auto;
  --background: white;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px;
`
export const ThemeInfo = styled.div`
  width: 60%;
  margin: 1em auto;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px;
`

export const InfoDiv = styled.div`
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  width: 40%;
`
export const ImgWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 2em;
  @media (min-width: 668px) { 
    width: 170px;
    height: 170px;
  }
`
export const ThumbWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 8em;
`