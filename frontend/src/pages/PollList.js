// import React from 'react'
// import { ThemesDiv, ListContainer } from '../lib/container'
// import { ThemeCard } from '../components/ThemeCard'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getpolls } from '../reducers/user'
// import { FabPoll } from 'components/FabPoll'

// export const PollList = () => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getpolls())
//   }, [dispatch])
//   const polls = useSelector((store) => store.user.login.ongoingPolls)

//   return (
//     <ListContainer>
//       <NavbarLight />
//       <ThemesDiv>
//         <section>
//           {polls &&
//             polls.map(poll => (
//               <ThemeCard {...poll} />
//             ))
//           }
//         </section>
//       </ThemesDiv>
//       <FabPoll />
//     </ListContainer>
//   )
// }

// export default PollList
