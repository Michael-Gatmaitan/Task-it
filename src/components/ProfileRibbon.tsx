import React, { useRef, useState } from "react";
import NavigateDown from "../assets/icons/navigate-down.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  editProfileInformation,
  getActiveUser,
  getUserLoggedIn,
} from "../slices/userSlice";

import "./styles/ProfileRibbon.css";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";

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

  const setDefaultValueOfState = () => {
    if (
      editUsernameRef?.current !== null &&
      editImageLinkRef?.current !== null
    ) {
      editUsernameRef.current.getElementsByTagName("input")[0].value = "";
      editImageLinkRef.current.getElementsByTagName("input")[0].value = "";
    }

    /*
      Set all state back to default when profile EDITED or
      profile ribbon is CLOSED
    */

    setToggleEditProfile(false);

    setImageLink("");
    setPreviewImage(false);
    setDisablePreviewImage(true);
    setDisableSubmitButton(true);
    setPreviewImage(false);
  };

  const handleProfileEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      editUsernameRef?.current !== null &&
      editImageLinkRef?.current !== null
    ) {
      const editUsernameValue =
        editUsernameRef.current.getElementsByTagName("input")[0].value;
      const editProfileLinkValue =
        editImageLinkRef.current.getElementsByTagName("input")[0].value;

      dispatch(
        editProfileInformation({
          username: editUsernameValue,
          profileImageLink: editProfileLinkValue,
        })
      );

      setDefaultValueOfState();
    } else {
      console.log("Invalid edit profile attributes.");
    }
  };

  const editUsernameRef = useRef<HTMLInputElement>(null);
  const editImageLinkRef = useRef<HTMLInputElement>(null);

  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [usernameFieldError, setUsernameFieldError] = useState(false);

  const usernameValueOnChange = () => {
    if (editUsernameRef?.current === null) return;
    const usernameField =
      editUsernameRef.current.getElementsByTagName("input")[0];
    const usernameVal = usernameField.value;

    setDisableSubmitButton(usernameVal === "");
    setUsernameFieldError(usernameVal === "");
  };

  const [imageLink, setImageLink] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [disablePreviewImage, setDisablePreviewImage] = useState<boolean>(true);

  const imageLinkValueOnChange = () => {
    if (editImageLinkRef?.current === null) return;
    const imageLinkField =
      editImageLinkRef.current.getElementsByTagName("input")[0];
    const imageLinkVal = imageLinkField.value;

    if (previewImage && imageLinkVal === "") {
      setPreviewImage(false);
    }

    setImageLink(imageLinkVal);
    setDisablePreviewImage(imageLinkVal === "");
    setDisableSubmitButton(imageLinkVal === "");
  };

  return toggleEditProfile ? (
    <div className='edit-profile bordered-container'>
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
            label={usernameFieldError ? "New name required" : "Edit name"}
            variant='outlined'
            ref={editUsernameRef}
            error={usernameFieldError}
            onChange={usernameValueOnChange}
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
              ref={editImageLinkRef}
              onChange={imageLinkValueOnChange}
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

        {previewImage ? (
          <div className='image-preview'>
            <img src={imageLink} loading='lazy' />
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
            disabled={disableSubmitButton}
          >
            Edit info
          </Button>

          <Button
            variant='contained'
            color='error'
            onClick={() => setDefaultValueOfState()}
          >
            Close
          </Button>
        </Box>
      </form>
    </div>
  ) : null;
};

export default ProfileRibbon;
