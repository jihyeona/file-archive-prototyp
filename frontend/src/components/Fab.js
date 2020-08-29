import React from 'react'
import { Link } from 'react-router-dom'
import { AnimationButton, Plus } from 'lib/button'

export const Fab = (props) => {
  const pollId = props.pollId
  return (
    <Link to={`/${pollId}/additem`} >
      <AnimationButton>
        <Plus src={require('../assets/plus-thin.svg')} alt='Add button' />
      </AnimationButton>
    </Link>
  )
}

