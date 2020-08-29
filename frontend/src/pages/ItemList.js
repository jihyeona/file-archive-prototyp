import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deletepoll } from 'reducers/user'
import { ItemCard } from '../components/ItemCard'
import NavbarLight from '../components/NavBar'
import { Fab } from 'components/Fab'
import { AddItemLottie } from 'components/AddItemLottie'
import { VoteLottie } from 'components/VoteLottie'
import { ListContainer, ItemRow } from '../lib/container'
import { PollTitle, PollText } from '../lib/headline'
import { FiTrash2 } from 'react-icons/fi'

export const ItemList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { pollId } = useParams()
  const polls = useSelector((store) => store.user.login.ongoingPolls)
  const loggedInUserId = useSelector((store) => store.user.login.userId)
  const poll = polls.filter(poll => poll._id === pollId)
  const pollCreatorId = poll[0].userId
  const pollTitle = poll[0].title
  const pollItems = poll[0].items.slice()
  console.log(pollItems)
  pollItems.sort((a, b) => b.likes.length - a.likes.length)

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deletepoll(pollId, pollCreatorId))
    history.push('/home')
  }

  return (
    <ListContainer>
      <NavbarLight />
      <PollTitle>{pollTitle}</PollTitle>
      {loggedInUserId === pollCreatorId && <FiTrash2 onClick={(e) => handleDelete(e)}>delete the poll</FiTrash2>}
      {pollItems.length !== 0 && <><VoteLottie id='votelottie' /><PollText>Pick the items that you <span role='img' aria-label='heartemoji'>💗</span></PollText></>}
      {pollItems.length === 0 && <><AddItemLottie /><PollText>Add item with the button on the right bottom.</PollText></>}
      <ItemRow>
        {
          pollItems.map(item => (
            <ItemCard {...item} pollId={pollId} />
          ))
        }
      </ItemRow>
      <Fab pollId={pollId} />
    </ListContainer>
  )
}

export default ItemList