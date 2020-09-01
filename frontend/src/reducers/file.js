import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    existingFiles: null,
    errorMessage: null,
  },
};

export const file = createSlice({
  name: 'file',
  initialState: initialState,
  reducers: {
    setExistingFiles: (state, action) => {
      const { existingFiles } = action.payload;
      state.login.existingFiles = existingFiles;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },
  },
});

//Thunks
export const getfiles = () => {
  const FILE_URL = 'https://file-archive.herokuapp.com/files';
  return (dispatch) => {
    fetch(FILE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(console.log('fetching the existing files...'))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not fetch the existing files.');
      })
      .then((json) => {
        dispatch(file.actions.setExistingFiles({ existingFiles: json }));
      })
      .catch((err) => {
        dispatch(file.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

export const addfile = (description, userName, fileInput) => {
  const FILE_URL = 'https://file-archive.herokuapp.com/files';
  const formData = new FormData();
  formData.append('fileimage', fileInput.current.files[0]);
  formData.append('description', description);
  formData.append('userName', userName);
  return (dispatch) => {
    fetch(FILE_URL, {
      method: 'POST',
      body: formData,
    })
      .then(console.log('posted file info to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not upload the file.');
      })
      .then((json) => {
        dispatch(getfiles());
      })
      .catch((err) => {
        dispatch(file.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

export const deletefile = (uploadId) => {
  const MYFILE_URL = `https://file-archive.herokuapp.com/files/${uploadId}`;
  return (dispatch) => {
    fetch(MYFILE_URL, {
      method: 'DELETE',
    })
      .then(console.log('deleting the file...'))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not delete the file. Try again.');
      })
      .then((json) => {
        dispatch(getfiles());
      })
      .catch((err) => {
        dispatch(file.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};
