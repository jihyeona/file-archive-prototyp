import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { user, signup, getfiles } from '../reducers/file';
import { PollTitle, PollText } from '../lib/headline';
import { VoteLottie } from '../components/VoteLottie';
import { AddItemLottie } from '../components/AddItemLottie';
import { Button } from '../lib/button';
import { ListContainer, ThemesDiv } from '../lib/container';
import { Form, Input } from '../lib/form';
import { FabPoll } from '../components/FabPoll';
import { FileTable } from '../components/FileTable';
import { ThemeCard } from '../components/ThemeCard';

export const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfiles());
  }, [dispatch]);
  const files = useSelector((store) => store.file.login.existingFiles);
  return (
    <ListContainer>
      <PollTitle>File Archive</PollTitle>
      {files.length !== 0 && (
        <>
          <VoteLottie id="votelottie" />
        </>
      )}
      {files.length === 0 && (
        <>
          <AddItemLottie />
          <PollText>
            Upload your file with the button on the right bottom.
          </PollText>
        </>
      )}
      <ThemesDiv>
        <section>
          {files && files.map((file) => <ThemeCard {...file} />)}
        </section>
      </ThemesDiv>
      <FabPoll />
    </ListContainer>
  );
};

export default HomePage;
