import React from 'react';
import { Link } from 'react-router-dom';
import { AnimationButton, Plus } from 'lib/button';

export const FabPoll = () => {
  return (
    <Link to={'/upload'}>
      <AnimationButton>
        <Plus src={require('../assets/plus-thin.svg')} alt="Add button" />
      </AnimationButton>
    </Link>
  );
};
