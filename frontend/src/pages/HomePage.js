import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { file, getfiles } from '../reducers/file';
import { PollTitle, PollText } from '../lib/headline';
import { VoteLottie } from '../components/VoteLottie';
import { AddItemLottie } from '../components/AddItemLottie';
import { Button } from '../lib/button';
import { ListContainer, ThemesDiv } from '../lib/container';
import { Form, Input } from '../lib/form';
import { FabPoll } from '../components/FabPoll';
import { FileTable } from '../components/FileTable';
import { ThemeCard } from '../components/FileTable';
import moment from 'moment';
import { Styles } from '../lib/table';

export const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfiles());
  }, [dispatch]);
  const files = useSelector((store) => store.file.login.existingFiles);
  console.log(files);
  // const uploadedAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');

  const columns = useMemo(() => [
    {
      Header: 'File Archive',
      columns: [
        {
          Header: 'File Name',
          accessor: 'fileName',
        },
        {
          Header: 'Description',
          accessor: 'description',
        },
        {
          Header: 'Uploaded By',
          accessor: 'userName',
        },
        {
          Header: 'Uploaded At',
          accessor: 'createdAt',
        },
      ],
    },
  ]);

  return (
    <div>
      <Styles>{files && <FileTable columns={columns} data={files} />}</Styles>
    </div>
  );
};

export default HomePage;
