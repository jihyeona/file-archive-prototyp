import React from 'react'
import Lottie from 'lottie-react-web'
import animation from 'assets/animation/poll.json'


export const VoteLottie = () => {
  return (
    <>
      <Lottie
        options={{
          animationData: animation,
        }}
        width='150px'
        height='150px'
        autoPlay
      />
    </>
  )
}