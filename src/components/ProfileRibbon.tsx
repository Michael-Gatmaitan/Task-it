import React from "react";
import NavigateDown from "../assets/icons/navigate-down.svg";
import { useAppSelector } from "../app/hooks";
import { getActiveUser } from "../slices/userSlice";

import "./styles/ProfileRibbon.css";

const ProfileRibbon: React.FC<{ platform: "desktop" | "mobile" }> = ({
  platform,
}) => {
  const { username, profileImageLink } = useAppSelector(getActiveUser);

  /* If the platform is DESKTOP, it is automatically hidden on default
      If platform is MOBILE, it is automatically shown */

  const ribbonStyle: React.CSSProperties =
    platform === "mobile"
      ? {
          display: "grid",
        }
      : {};

  return (
    <div
      className={`profile-ribbon ${
        platform === "mobile" ? "bordered-container" : ""
      }`}
      style={ribbonStyle}
    >
      <div className='profile-image'>
        <img src={profileImageLink} alt='profime-image' />
      </div>
      <div className='profile-username'>{username}</div>
      <div className='profile-navigate-down-icon'>
        <img src={NavigateDown} alt='navigate-down' />
      </div>
    </div>
  );
};

export default ProfileRibbon;
