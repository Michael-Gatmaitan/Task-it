import React, { useState } from "react";

import { useAppSelector } from "../app/hooks";
import { getActiveUser, getUserLoggedIn } from "../slices/userSlice";

import "./styles/ProfileRibbon.css";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";

import EditProfileModal from "./pages/modals/EditProfileModal";

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
      <div onClick={() => setToggleEditProfile(!toggleEditProfile)}>
        {/* <img src={NavigateDown} alt='navigate-down' /> */}
        {toggleEditProfile ? (
          <ExpandLessRounded fontSize='large' />
        ) : (
          <ExpandMoreRounded fontSize='large' />
        )}
      </div>

      {toggleEditProfile ? (
        <EditProfileModal
          toggleEditProfile={toggleEditProfile}
          setToggleEditProfile={setToggleEditProfile}
          username={username}
          profileImageLink={profileImageLink}
        />
      ) : null}
    </div>
  ) : null;
};

export default ProfileRibbon;
