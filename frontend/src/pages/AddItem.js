import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, PollForm } from '../lib/form'
import { AddPollContainer } from '../lib/container'
import { PollText } from '../lib/headline'
import { Button } from '../lib/button'
import { additem } from 'reducers/user'
import { useParams, useHistory } from 'react-router-dom'
import { AddPollLottie } from '../components/AddPollLottie'
import NavbarLight from '../components/NavBar'

export const AddItem = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const fileInput = useRef()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { pollId } = useParams()
  const userId = useSelector((store) => store.user.login.userId)

  const handleItemSubmit = (e) => {
    e.preventDefault()
    dispatch(additem(name, description, fileInput, pollId, userId))
    setName('')
    setDescription('')
    history.push(`/polls/${pollId}`)
  }

  return (
    <AddPollContainer>
      <NavbarLight />
      <AddPollLottie />
      <PollForm onSubmit={handleItemSubmit}>
        <PollText>Add your option.</PollText>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder='Title'
          required />
        <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          maxlength="150"
          required />

        <label>
          <input type="file" ref={fileInput} />
        </label>

        <Button type="submit" title='Submit'>
          Add item
      </Button>
      </PollForm>
    </AddPollContainer>
  )
}

export default AddItem