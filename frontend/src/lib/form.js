import styled from 'styled-components/macro';

export const Input = styled.input`
  height: 2.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 2px;
`;

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
`;
