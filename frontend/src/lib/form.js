import styled from 'styled-components/macro'

export const Form = styled.form`
  width: 100%;
  --background: #fafafa;
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
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  @media (min-width: 668px) { 
    width: 50%;
    margin: 2em 1em; 
  }
`
export const TopForm = styled.form`
  z-index: 20;
  position: absolute;
  font-size: 20px;
  top: 4em;
  left: 1em;
  width: 20%;
  height: auto;
  border-radius: 20px;
  align-self: center;
`
export const TogglePasswordForm = styled.form`
  margin-left: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 668px) { 
    justify-content: space-between;
    margin-top: 1.4em;
  }
`
export const Input = styled.input`
  height: 2.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 2px;
`

export const PollForm = styled.form`
  width: 75%;
  display: flex;
  margin-bottom: 1em;
  flex-direction: column;
  border-radius: 6px 6px;
  justify-content: center;
  align-items: stretch;
  background-color: #c6c7d6;
  padding: 1em;
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  @media (min-width: 668px) { 
    width: 40%;
    margin: 1em auto; 
  }
`
export const ProfileImgForm = styled.form`
  display: flex;
  padding: 2rem; 
`
export const ProfileForm = styled.form`
  width: 100%;
  margin-bottom: 1em;
  `

export const SmallImgForm = styled.form`
  width: 100%;
  `
export const InputButton = styled.input`
  margin-top: 0;
  padding: 0.5em 1.5em;
  color: #4f4f4f;
  text-align: center;
  font-size: 1.2em;
  font-size: 0.825rem;
  text-align: center;
  height: 2.5em;
  margin-top: 1em;
  border-radius: 300px;
  border: none;
  &:hover {
    background: #adbce6;
    color: white;
  } 
`
export const ProfilePicInput = styled.input`
  margin-top: 5.5em;
  margin-left: 15vw;
  @media (min-width: 668px) { 
    margin-top: 0;
  }
`