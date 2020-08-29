import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import NavbarLight from '../components/NavBar'
import { Input, PollForm } from '../lib/form'
import { addpoll } from '../reducers/user'
import { AddPollContainer } from '../lib/container'
import { Button } from '../lib/button'
import { AddPollLottie } from '../components/AddPollLottie'

export const AddPoll = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const fileInput = useRef()
  const [title, setTitle] = useState('')
  const userId = useSelector((store) => store.user.login.userId)

  const handlePollSubmit = (e) => {
    e.preventDefault()
    dispatch(addpoll(title, fileInput, userId))
    setTitle('')
    history.push('/home')
  }

  return (
    <AddPollContainer>
      <NavbarLight />
      <AddPollLottie />
      <PollForm onSubmit={handlePollSubmit}>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          maxlength="20"
          required />
        <input type="file" ref={fileInput} />
        <Button type="submit" title='Submit'>
          Create
          </Button>
      </PollForm>
    </AddPollContainer>
  )
}

export default AddPoll