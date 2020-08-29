import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getlikeditems } from 'reducers/user'
import { SmallImage } from 'lib/images'
import { ThumbWrapper } from 'lib/container'
import { ThumbText } from 'lib/headline'
import { Link } from 'react-router-dom'


export const LikeList = ({ img }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getlikeditems())
  }, [dispatch])

  const likedItemsArr = useSelector((store) => store.user.login.likedItems)

  return (
    <ThumbWrapper>
      {likedItemsArr &&
        likedItemsArr.map(item => (
          <Link to={`/polls/${item._id}`} key={item._id}>
            <SmallImage src={item.items.imageUrl} />
            <ThumbText>{item.items.name}</ThumbText>
          </Link>
        ))
      }
    </ThumbWrapper>
  )
}

export default LikeList