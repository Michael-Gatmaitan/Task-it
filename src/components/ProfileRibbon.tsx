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
        profileImageLink={profileImageLink}
      />
    </div>
  ) : null;
};

interface EditProfileModalProps {
  toggleEditProfile: boolean;
  setToggleEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  profileImageLink: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = (props) => {
  const {
    toggleEditProfile,
    setToggleEditProfile,
    username,
    profileImageLink,
  } = props;

  const dispatch = useAppDispatch();

  const setDefaultValueOfStates = () => {
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

    // setImageLink("");
    setDisablePreviewImage(false);
    setPreviewImage(false);
  };

  const handleProfileEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e);

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

      setDefaultValueOfStates();
    } else {
      console.log("Invalid edit profile attributes.");
    }
  };

  const editUsernameRef = useRef<HTMLInputElement>(null);
  const editImageLinkRef = useRef<HTMLInputElement>(null);

  const [usernameFieldError, setUsernameFieldError] = useState(false);

  // Check both validation
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [profileImageValidation, setProfileImageValidation] = useState(false);

  const usernameValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameTFieldVal = e.target.value.trim();

    // Setting error if input is == to username
    setUsernameFieldError(usernameTFieldVal === username);

    //
    setUsernameValidation(
      usernameTFieldVal === "" || usernameTFieldVal === username
    );
    console.log(usernameTFieldVal, username);
  };

  // States for previewing images
  const [imageLink, setImageLink] = useState<string>(profileImageLink);
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [disablePreviewImage, setDisablePreviewImage] =
    useState<boolean>(false);

  const imageLinkValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLinkVal = e.target.value.trim();

    if (previewImage && imageLinkVal === "") setPreviewImage(false);

    setImageLink(imageLinkVal);
    setDisablePreviewImage(imageLinkVal === "");

    setProfileImageValidation(imageLinkVal === "");
  };

  const isFormNotValid = usernameValidation || profileImageValidation;

  // Debugging logical error purposes
  useEffect(() => {
    console.log(
      `Is form valid: ${usernameValidation} + ${profileImageValidation} = ${isFormNotValid}`
    );
  }, [usernameValidation, profileImageValidation, isFormNotValid]);

  return (
    <div
      className='edit-profile bordered-container'
      style={{
        display: toggleEditProfile ? "grid" : "none",
        // opacity: toggleEditProfile ? 1 : 0,
        // pointerEvents: toggleEditProfile ? "auto" : "none",
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
            label={usernameFieldError ? "Enter new name" : "Edit name"}
            variant='outlined'
            ref={editUsernameRef}
            error={usernameFieldError}
            defaultValue={username}
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
              defaultValue={profileImageLink}
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
            // disabled={disableSubmitButton}
            disabled={isFormNotValid}
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
