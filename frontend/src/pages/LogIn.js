// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { user, login } from '../reducers/user'
// import { Headline } from '../lib/headline'
// import { Button } from '../lib/button'
// import { Column } from '../lib/container'
// import { Form, Input } from '../lib/form'
// import { InfoDiv } from '../lib/container'
// import { Register, ProfileMessage } from '../lib/headline'
// import { useHistory, Link } from 'react-router-dom'

// export const LogIn = () => {
//   const dispatch = useDispatch()
//   const history = useHistory()
//   const accessToken = useSelector((store) => store.user.login.accessToken)
//   const errorMessage = useSelector((store) => store.user.login.errorMessage)
//   const [name, setName] = useState('')
//   const [password, setPassword] = useState('')

//   useEffect(() => {
//     if (accessToken) {
//       history.push('/home')
//     }
//   })

//   useEffect(() => {
//     dispatch(user.actions.setErrorMessage({ errorMessage: null }))
//   }, [dispatch])

//   const handleLogin = (event) => {
//     event.preventDefault()
//     dispatch(login(name, password))
//     setName('')
//     setPassword('')
//   }

//   if (!accessToken) {
//     return (
//       <Column>
//         <Form onSubmit={(event) => handleLogin(event)}>
//           <Headline title='Log in' />
//           <InfoDiv>
//             <Input
//               placeholder='name'
//               required
//               value={name}
//               onChange={(event) => setName(event.target.value)}
//             />
//             <Input
//               type='password'
//               placeholder='password'
//               maxlength="100"
//               required
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//             />
//             {errorMessage && <ProfileMessage>{`${errorMessage}`}</ProfileMessage>}
//             <Button type='submit' title='Log in' />
//             <Register>Not a member?<Link to="/"><h4>Sign up</h4></Link></Register>
//           </InfoDiv>
//         </Form>
//       </Column>
//     )
//   } else {
//     return (null)
//   }
// }

// export default LogIn
