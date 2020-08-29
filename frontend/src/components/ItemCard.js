import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvote, downvote, deleteitem } from '../reducers/user'
import { Thumbnail } from 'lib/images'
import { ReadButton } from 'lib/button'
import { ItemText, ItemDescription, ItemContainer } from 'lib/container'
import { FiHeart, FiTrash } from 'react-icons/fi'

export const ItemCard = ({ name, description, imageUrl, _id, likes, userId, pollId }) => {

  const dispatch = useDispatch()
  const loggedInUserId = useSelector((store) => store.user.login.userId)
  const itemCreatorId = userId
  const itemId = _id
  const manyLikes = likes.length
  const upvoted = likes.some(like => like.userId === loggedInUserId)
  const [isUpvoted, setIsUpvoted] = useState(upvoted)
  const [open, setOpen] = useState(false)
  const maxLength = 100

  const handleUpvote = (event) => {
    event.preventDefault()
    if (upvoted) {
      dispatch(downvote(pollId, itemId, loggedInUserId))
    }
    else if (!upvoted) {
      dispatch(upvote(loggedInUserId, itemId))
    }
    setIsUpvoted(!isUpvoted)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteitem(itemId))
  }

  return (
    <ItemContainer>
      <Thumbnail
        src={imageUrl}
        alt={name}
      />
      <ItemText>
        <FiHeart onClick={(event) => handleUpvote(event)} style={{ fill: upvoted ? 'red' : 'none' }}></FiHeart>
        <h4>{manyLikes} likes</h4>
        {loggedInUserId === itemCreatorId && <FiTrash onClick={(e) => handleDelete(e)}>delete the item</FiTrash>}
      </ItemText>
      <ItemDescription>
        <h4>{name}</h4>
        {!open && <p>{description.length >= maxLength ? description.slice(0, 100) + '...' : `${description}`}</p>}
        {open && <p>{description}</p>}
        {!open && description.length >= maxLength && <ReadButton onClick={() => setOpen(prev => !prev)}>more</ReadButton>}
      </ItemDescription>
    </ItemContainer>
  )
}
export default ItemCard 