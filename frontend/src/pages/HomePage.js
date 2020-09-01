import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getfiles } from '../reducers/file';
import { FileTable } from '../components/FileTable';
import { Styles } from '../lib/table';
import { HomeDiv } from '../lib/container'

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
  ], []);

  return (
    <HomeDiv>
      <Styles>{files && <FileTable columns={columns} data={files} />}</Styles>
    </HomeDiv>
  );
};

export default HomePage;
