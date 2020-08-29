import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { user, signup } from '../reducers/user'
import { Headline, Register } from '../lib/headline'
import { Button } from '../lib/button'
import { Column, InfoDiv } from '../lib/container'
import { Form, Input } from '../lib/form'


export const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (accessToken) {
      history.push('/mypage')
    }
  })
  useEffect(() => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  })

  const handleSignup = (event) => {
    event.preventDefault()
    dispatch(signup(name, email, password))
  }

  if (!accessToken) {
    return (
      <Column>
        <Form onSubmit={(event) => handleSignup(event)}>
          <Headline title='sign up' />
          <InfoDiv>
            {errorMessage && <h4>{`${errorMessage}`}</h4>}
            <Input
              placeholder='name'
              required
              maxlength='150'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type='email'
              placeholder='email'
              required
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              maxlength='100'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type='password'
              placeholder='password'
              required
              maxlength='100'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type='submit' title='Sign up' />
            <Register>Already a member?<Link to='/login'><h4>Log in</h4></Link></Register>
          </InfoDiv>
        </Form>
      </Column>
    )
  }
  else {
    return (null)
  }
}

export default SignUp