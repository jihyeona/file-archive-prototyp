import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addfile } from '../reducers/file';
import { Input, PollForm } from '../lib/form';
import { AddPollContainer } from '../lib/container';
import { PollText } from '../lib/headline';
import { FormButton } from '../lib/button';
import { AddPollLottie } from '../components/AddPollLottie';

export const AddFile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = useRef();
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');

  const handleFileSubmit = (e) => {
    e.preventDefault();
    dispatch(addfile(description, userName, fileInput));
    setUserName('');
    setDescription('');
    history.push('/');
  };

  return (
    <AddPollContainer>
      <AddPollLottie />
      <PollForm onSubmit={handleFileSubmit}>
        <PollText>Upload your file here.</PollText>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          maxlength="150"
        />
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Uploaded by"
          required
        />
        <label>
          <input type="file" ref={fileInput} />
        </label>

        <FormButton type="submit" title="Upload">
          Upload
        </FormButton>
      </PollForm>
    </AddPollContainer>
  );
};

export default AddFile;
