import React, { useRef, useState } from "react";
import NavigateDown from "../assets/icons/navigate-down.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  editProfileInformation,
  getActiveUser,
  getUserLoggedIn,
} from "../slices/userSlice";

import "./styles/ProfileRibbon.css";

interface ProfileRibbonProps {
  platform: "desktop" | "mobile";
}

const ProfileRibbon: React.FC<ProfileRibbonProps> = ({ platform }) => {
  const { username, profileImageLink } = useAppSelector(getActiveUser);
  const loggedIn = useAppSelector(getUserLoggedIn);

  const [toggleEditProfile, setToggleEditProfile] = useState(false);

  /* If the platform is DESKTOP, it is automatically hidden on default
      If platform is MOBILE, it is automatically shown */

  const ribbonStyle: React.CSSProperties =
    platform === "mobile"
      ? {
          display: "grid",
        }
      : {};

  return loggedIn ? (
    <div
      className={`profile-ribbon ${
        platform === "mobile" ? "bordered-container" : ""
      }`}
      style={ribbonStyle}
    >
      <div className='profile-image'>
        <img src={profileImageLink} alt='profile-image' />
      </div>
      <div className='profile-username'>{username}</div>
      <div
        className='profile-navigate-down-icon'
        style={{ transform: `rotate(${toggleEditProfile ? 180 : 0}deg)` }}
        onClick={() => setToggleEditProfile((prevState) => !prevState)}
      >
        <img src={NavigateDown} alt='navigate-down' />
      </div>

      <EditProfileModal
        toggleEditProfile={toggleEditProfile}
        setToggleEditProfile={setToggleEditProfile}
      />
    </div>
  ) : null;
};

interface EditProfileModalProps {
  toggleEditProfile: boolean;
  setToggleEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = (props) => {
  const { toggleEditProfile, setToggleEditProfile } = props;

  const dispatch = useAppDispatch();

  const handleProfileEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      editUsernameRef.current?.value !== undefined &&
      editImageLinkRef.current?.value !== undefined
    ) {
      dispatch(
        editProfileInformation({
          username: editUsernameRef.current.value,
          profileImageLink: editImageLinkRef.current.value,
        })
      );

      editUsernameRef.current.value = "";
      editImageLinkRef.current.value = "";
      setToggleEditProfile(false);
    } else {
      console.log("Invalid edit profile attributes.");
    }
  };

  const editUsernameRef = useRef<HTMLInputElement>(null);
  const editImageLinkRef = useRef<HTMLInputElement>(null);

  return toggleEditProfile ? (
    <div className='edit-profile bordered-container'>
      <form name='profile-editor' onSubmit={handleProfileEditSubmit}>
        <div className='little-header'>Name</div>
        <input
          type='text'
          className='text-box'
          ref={editUsernameRef}
          placeholder='Edit username'
          name='username'
        />
        <div className='little-header'>Profile image link</div>
        <input
          type='text'
          className='text-box'
          ref={editImageLinkRef}
          placeholder='Edit image link'
          name='profile-image-link'
        />

        <div className='edit-profile-buttons'>
          <input type='submit' value='Edit info' className='default-button' />

          <button
            className='default-button invicible-button close-edit-profile'
            onClick={() => setToggleEditProfile(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default ProfileRibbon;
