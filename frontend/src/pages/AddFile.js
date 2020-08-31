import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PollForm } from '../lib/form';
import { AddPollContainer } from '../lib/container';
import { PollText } from '../lib/headline';
import { Button } from '../lib/button';
import { addfile } from 'reducers/file';
import { useParams, useHistory } from 'react-router-dom';
import { AddPollLottie } from '../components/AddPollLottie';

export const AddFile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInput = useRef();
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');

  const handleItemSubmit = (e) => {
    e.preventDefault();
    dispatch(addfile(description, userName, fileInput));
    setUserName('');
    setDescription('');
    history.push(`/home`);
  };

  return (
    <AddPollContainer>
      <AddPollLottie />
      <PollForm onSubmit={handleItemSubmit}>
        <PollText>Upload your file here.</PollText>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          maxlength="150"
          required
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

        <Button type="submit" title="Submit">
          Upload
        </Button>
      </PollForm>
    </AddPollContainer>
  );
};

export default AddFile;
