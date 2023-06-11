import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  editProfileInformation,
  getActiveUser,
  getUserLoggedIn,
} from "../slices/userSlice";

import "./styles/ProfileRibbon.css";
import { Box, Button, TextField } from "@mui/material";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";

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
        // style={{ transform: `rotate(${toggleEditProfile ? 180 : 0}deg)` }}
        onClick={() => setToggleEditProfile(!toggleEditProfile)}
      >
        {/* <img src={NavigateDown} alt='navigate-down' /> */}
        {toggleEditProfile ? (
          <ExpandLessRounded fontSize='large' />
        ) : (
          <ExpandMoreRounded fontSize='large' />
        )}
      </div>

      <EditProfileModal
        toggleEditProfile={toggleEditProfile}
        setToggleEditProfile={setToggleEditProfile}
        username={username}
      />
    </div>
  ) : null;
};

interface EditProfileModalProps {
  toggleEditProfile: boolean;
  setToggleEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = (props) => {
  const { toggleEditProfile, setToggleEditProfile, username } = props;

  const dispatch = useAppDispatch();

  const setDefaultValueOfStates = () => {
    /*
      Set all state back to default when profile EDITED or
      profile ribbon is CLOSED
    */

    setToggleEditProfile(false);
    setDisablePreviewImage(false);
    setPreviewImage(false);

    // Set all state value to empty.
  };

  const [editUsernameValue, setEditUsernameValue] = useState<string>("");
  const [editImageLinkValue, setEditImageLinkValue] = useState<string>("");

  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [disablePreviewImage, setDisablePreviewImage] =
    useState<boolean>(false);

  const [userInputError, setUserInputError] = useState<boolean>(true);

  useEffect(() => {
    console.log(editUsernameValue, editImageLinkValue);

    const usernameVal = editUsernameValue.trim();
    const imgVal = editImageLinkValue.trim();

    setUserInputError(
      usernameVal.trim() === "" ||
        usernameVal.trim() === username ||
        imgVal.trim() === ""
    );

    setDisablePreviewImage(imgVal === "");
  }, [editUsernameValue, editImageLinkValue, username]);

  const handleProfileEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      editProfileInformation({
        username: editUsernameValue,
        profileImageLink: editImageLinkValue,
      })
    );

    setDefaultValueOfStates();
  };

  return (
    <div
      className='edit-profile bordered-container'
      style={{
        display: toggleEditProfile ? "grid" : "none",
      }}
    >
      <form id='profile-editor' onSubmit={handleProfileEditSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": {
              mb: 1.5,
              width: "100%",
            },
          }}
        >
          <TextField
            label={"Enter new name"}
            variant='outlined'
            value={editUsernameValue}
            error={editUsernameValue === username}
            onChange={(e) => setEditUsernameValue(e.target.value)}
          />

          <Box
            sx={{
              "&": {
                display: "grid",
                gap: 1,
                gridTemplateColumns: "1fr auto",
              },

              "& .MuiButton-contained": {
                mb: 1.5,
                boxShadow: "none",
              },
            }}
          >
            <TextField
              label='Edit image link'
              variant='outlined'
              value={editImageLinkValue}
              onChange={(e) => setEditImageLinkValue(e.target.value)}
              // defaultValue={profileImageLink}
            />

            <Button
              variant='contained'
              disabled={disablePreviewImage}
              onClick={() => setPreviewImage(true)}
            >
              Preview image
            </Button>
          </Box>
        </Box>

        {previewImage && editImageLinkValue !== "" ? (
          <div className='image-preview'>
            <img src={editImageLinkValue} loading='lazy' />
          </div>
        ) : null}

        <Box
          sx={{
            "&": {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
            },
          }}
        >
          <Button
            variant='contained'
            type='submit'
            form='profile-editor'
            disabled={userInputError}
          >
            Edit info
          </Button>

          <Button
            variant='contained'
            color='error'
            onClick={() => setDefaultValueOfStates()}
          >
            Close
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ProfileRibbon;
