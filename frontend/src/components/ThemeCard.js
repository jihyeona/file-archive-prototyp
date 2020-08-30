import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeImage } from '../lib/images';
import { ThemeContainer } from 'lib/container';
import { ThemeTitle } from 'lib/headline';

export const ThemeCard = ({
  description,
  userName,
  imageUrl,
  imageId,
  _id,
}) => {
  return (
    <Link
      to={`/files/${_id}`}
      style={{ textDecoration: 'none', color: '#ffff' }}
    >
      <ThemeContainer>
        <ThemeImage src={imageUrl} alt={imageId} />
        <ThemeTitle>{imageId}</ThemeTitle>
        <ThemeTitle>{description}</ThemeTitle>
        <ThemeTitle>{userName}</ThemeTitle>
      </ThemeContainer>
    </Link>
  );
};
export default ThemeCard;
