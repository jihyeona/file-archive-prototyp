import React from 'react'
import { Link } from 'react-router-dom'
import { ThemeImage } from '../lib/images'
import { ThemeContainer } from 'lib/container'
import { ThemeTitle } from 'lib/headline'

export const ThemeCard = ({ title, imageUrl, _id }) => {
  return (
    <Link to={`/polls/${_id}`} style={{ textDecoration: 'none', color: '#ffff' }}>
      <ThemeContainer>
        <ThemeImage
          src={imageUrl}
          alt={title}
        />
        <ThemeTitle>{title}</ThemeTitle>
      </ThemeContainer>
    </Link>
  )
}
export default ThemeCard  