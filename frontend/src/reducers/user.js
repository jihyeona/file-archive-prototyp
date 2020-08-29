import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  login: {
    accessToken: null,
    errorMessage: null,
    secretMessage: null,
    userName: null,
    profileImage: null,
    email: null,
    userId: null,
    ongoingPolls: null,
    likedItems: null,
  },
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLoginResponse: (state, action) => {
      const { accessToken, userId, email } = action.payload
      state.login.accessToken = accessToken
      state.login.userId = userId
      state.login.email = email
    },
    setOngoingPolls: (state, action) => {
      const { ongoingPolls } = action.payload;
      state.login.ongoingPolls = ongoingPolls;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },
    setUserName: (state, action) => {
      const { userName } = action.payload;
      state.login.userName = userName;
    },
    setProfileImage: (state, action) => {
      const { profileImage } = action.payload
      state.login.profileImage = profileImage
    },
    setLikedItems: (state, action) => {
      const { likedItems } = action.payload
      state.login.likedItems = likedItems
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      state.login.secretMessage = secretMessage;
    },
  },
})

//Thunks
export const signup = (name, email, password) => {
  const SIGNUP_URL = 'https://heart-pick-final-project.herokuapp.com/users'
  return (dispatch) => {
    console.log('Trying to sign up ...')
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(console.log('posted registration info to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not creat account. Try a different username.')
      })
      .then((json) => {
        console.log(json)
        dispatch(user.actions.setLoginResponse({ accessToken: json.accessToken, userId: json.userId, email: json.email }))
        dispatch(user.actions.setUserName({ userName: json.name }))
        dispatch(user.actions.setErrorMessage({ errorMessage: null }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const login = (name, password) => {
  const LOGIN_URL = 'https://heart-pick-final-project.herokuapp.com/sessions'
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(console.log('Logging in...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Unable to log in. Please check your username and password')
      })
      .then((json) => {
        dispatch(user.actions.setLoginResponse({ accessToken: json.accessToken, userId: json.userId, email: json.email }))
        dispatch(user.actions.setProfileImage({ profileImage: json.profileImage }))
        dispatch(user.actions.setUserName({ userName: json.name }))
        dispatch(user.actions.setErrorMessage({ errorMessage: null }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
        dispatch(logout())
      })
  }
}

export const changepassword = (oldPassword, newPassword) => {
  const PASSWORD_URL = 'https://heart-pick-final-project.herokuapp.com/password'
  return (dispatch, getState) => {
    const userId = getState().user.login.userId
    const accessToken = getState().user.login.accessToken
    fetch(`${PASSWORD_URL}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: { Authorization: accessToken, 'Content-Type': 'application/json' },
    })
      .then(console.log('Changing password...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Unable to change password. Please check if current password is correct.')
      })
      .then((json) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: null }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    console.log('trying to log out ...')
    dispatch(user.actions.setLoginResponse({ accessToken: null, userId: 0, email: null }))
    dispatch(user.actions.setSecretMessage({ secretMessage: null }))
    dispatch(user.actions.setUserName({ userName: null }))
    dispatch(user.actions.setProfileImage({ profileImage: null }))
  }
}

export const UpdateProfilePic = (profileImage) => {

  const PROFILE_URL = 'https://heart-pick-final-project.herokuapp.com/users'

  return (dispatch, getState) => {
    const userId = getState().user.login.userId
    const accessToken = getState().user.login.accessToken
    console.log('Trying to update the profile image ...')
    const formData = new FormData()
    formData.append('image', profileImage)

    fetch(`${PROFILE_URL}/${userId}`, {
      method: 'PUT',
      body: formData,
      headers: { Authorization: accessToken }
    })
      .then(console.log('posted new profile image file to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not update the profile image. Please try again.')
      })
      .then((json) => {
        console.log(json)
        dispatch(user.actions.setProfileImage({ profileImage: json.profileImage }))
        dispatch(user.actions.setErrorMessage({ errorMessage: null }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const getpolls = () => {
  const POLL_URL = 'https://heart-pick-final-project.herokuapp.com/polls'
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(POLL_URL, {
      method: 'GET',
      headers: { Authorization: accessToken }
    })
      .then(console.log('fetching the existing polls...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not fetch the existing polls.')
      })
      .then((json) => {
        dispatch(user.actions.setOngoingPolls({ ongoingPolls: json }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const addpoll = (title, fileInput, userId) => {
  const POLL_URL = 'https://heart-pick-final-project.herokuapp.com/polls'
  const formData = new FormData()
  formData.append('pollimage', fileInput.current.files[0])
  formData.append('title', title)
  formData.append('userId', userId)
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(POLL_URL, {
      method: 'POST',
      body: formData,
      headers: { Authorization: accessToken }
    })
      .then(console.log('posted poll info to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not creat a poll. Try a different title.')
      })
      .then((json) => {
        dispatch(getpolls())
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const deletepoll = (pollId, pollCreatorId) => {
  const MYPOLL_URL = `https://heart-pick-final-project.herokuapp.com/polls/${pollId}/${pollCreatorId}`
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(MYPOLL_URL, {
      method: 'DELETE',
      headers: { Authorization: accessToken }
    })
      .then(console.log('deleting the poll...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        } throw new Error('Could not delete the poll. Try again.')
      })
      .then((json) => {
        dispatch(getpolls())
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const additem = (name, description, fileInput, pollId, userId) => {
  console.log(pollId)
  const pollParam = pollId
  const ITEM_URL = `https://heart-pick-final-project.herokuapp.com/polls/${pollParam}`
  const formData = new FormData()
  formData.append('itemimage', fileInput.current.files[0])
  formData.append('name', name)
  formData.append('description', description)
  formData.append('userId', userId)
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(ITEM_URL, {
      method: 'POST',
      body: formData,
      headers: { Authorization: accessToken }
    })
      .then(console.log('posted item info to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not add the item. Try again.')
      })
      .then((json) => {
        dispatch(getpolls())
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const deleteitem = (itemId) => {
  const MYITEM_URL = `https://heart-pick-final-project.herokuapp.com/items/${itemId}`
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(MYITEM_URL, {
      method: 'DELETE',
      headers: { Authorization: accessToken }
    })
      .then(console.log('deleting the item...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        } throw new Error('Could not delete the item. Try again.')
      })
      .then((json) => {
        dispatch(getpolls())
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const upvote = (loggedInUserId, itemId) => {
  const ITEM_URL = `https://heart-pick-final-project.herokuapp.com/items/${itemId}`
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(ITEM_URL, {
      method: 'POST',
      body: JSON.stringify({ loggedInUserId }),
      headers: { Authorization: accessToken, 'Content-Type': 'application/json' }
    })
      .then(console.log('posted upvote with userId to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not upvote. Try again.')
      })
      .then((json) => {
        dispatch(getpolls())
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const downvote = (pollId, itemId, loggedInUserId) => {
  const LIKE_URL = `https://heart-pick-final-project.herokuapp.com/${pollId}/${itemId}/likes/${loggedInUserId}`
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    fetch(LIKE_URL, {
      method: 'DELETE',
      headers: { Authorization: accessToken }
    })
      .then(console.log('unliking the item...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        } throw new Error('Could not execute downvote. Try again.')
      })
      .then((json) => {
        dispatch(getpolls())
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const getlikeditems = () => {
  const LIKE_URL = 'https://heart-pick-final-project.herokuapp.com/likes'
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    const userId = getState().user.login.userId
    fetch(`${LIKE_URL}/${userId}`, {
      method: 'GET',
      headers: { Authorization: accessToken }
    })
      .then(console.log('fetching the liked items...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not fetch the liked items.')
      })
      .then((json) => {
        dispatch(user.actions.setLikedItems({ likedItems: json }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const getSecretMessage = () => {
  const USERS_URL = 'https://heart-pick-final-project.herokuapp.com/users'
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    const userId = getState().user.login.userId
    fetch(`${USERS_URL}/${userId}/secret`, {
      method: 'GET',
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not get information. Make sure you are logged in and try again.')
      })
      // SUCCESS: Do something with the information we got back
      .then((json) => {
        dispatch(user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}
