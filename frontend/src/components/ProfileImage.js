import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProfilePic } from '../lib/images'
import { ImgWrapper, ProfilePicSection } from '../lib/container'
import { ProfileImgButton, ImageButton } from '../lib/button'
import { ProfilePicInput, TogglePasswordForm } from '../lib/form'
import { UpdateProfilePic } from 'reducers/user'

export const ProfileImage = () => {
  const dispatch = useDispatch()
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const image = useSelector((state) => state.user.login.profileImage)
  const fileInput = useRef()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(UpdateProfilePic(fileInput.current.files[0]))
  }

  return (

    <ProfilePicSection>
      <ImgWrapper>
        <ProfileImgButton onClick={() => setShowUpdateForm(!showUpdateForm)}>Update Profile Image</ProfileImgButton>
        {!image && <ProfilePic src={require('../assets/profile.png')} alt="profile picture"></ProfilePic>}
        {image && <ProfilePic src={image} alt="profile picture"></ProfilePic>}
      </ImgWrapper>
      {showUpdateForm &&
        <TogglePasswordForm onSubmit={handleFormSubmit}>
          <label>
            <ProfilePicInput type="file" ref={fileInput} />
          </label>
          <ImageButton type="submit" title='Update Profile Image' />
        </TogglePasswordForm>
      }
    </ProfilePicSection>

  )
}

export default ProfileImage