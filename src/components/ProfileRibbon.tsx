import React, { useState, useEffect } from "react";
import SelectProfileImage from "./reusable/selectProfileImage/SelectProfileImage";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  editProfileInformation,
  getActiveUser,
  getUserLoggedIn,
} from "../slices/userSlice";

import "./styles/ProfileRibbon.css";
import { Box, Button, TextField } from "@mui/material";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";
import { useImageLinkChecker, useIsUsernameExist } from "../app/formValidation";

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
    /*
      Set all state back to default when profile EDITED or
      profile ribbon is CLOSED
    */

    console.log("Closing all states");

    setToggleEditProfile(false);
    setDisablePreviewImage(false);
    setPreviewImage(false);

    // Set all state value to empty.
    if (editUsernameValue !== username) setEditUsernameValue(username);

    if (editImageLinkValue !== profileImageLink)
      setEditImageLinkValue(profileImageLink);
  };

  const [editUsernameValue, setEditUsernameValue] = useState<string>("");
  const [editImageLinkValue, setEditImageLinkValue] = useState<string>("");

  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [disablePreviewImage, setDisablePreviewImage] =
    useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string>("");

  const [userInputError, setUserInputError] = useState<boolean>(true);

  // custom hook that validates exists username.
  const usernameExist = useIsUsernameExist(editUsernameValue);

  useEffect(() => {
    const usernameVal = editUsernameValue.trim();
    const imgVal = editImageLinkValue.trim();

    setUserInputError(
      usernameVal.trim() === "" ||
        usernameVal.trim() === username ||
        usernameExist ||
        !isImageLinkValid ||
        (imgVal.trim() === "" && selectedImage === "")
    );

    setDisablePreviewImage(imgVal === "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editUsernameValue,
    editImageLinkValue,
    username,
    selectedImage,
    usernameExist,
  ]);

  const handleEditProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Edit Submitted.");

    dispatch(
      editProfileInformation({
        username: editUsernameValue,
        profileImageLink:
          selectedImage !== "" ? selectedImage : editImageLinkValue,
      })
    );

    setDefaultValueOfStates();
  };

  useEffect(() => {
    if (!toggleEditProfile) setDefaultValueOfStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleEditProfile]);

  const isImageLinkValid = useImageLinkChecker(editImageLinkValue);

  useEffect(() => {
    console.log(isImageLinkValid);
  }, [isImageLinkValid]);

  return (
    <div
      className='edit-profile bordered-container'
      style={{
        display: toggleEditProfile ? "grid" : "none",
      }}
    >
      <form id='profile-editor' onSubmit={handleEditProfileSubmit}>
        <Box
          sx={{
            "&": {
              display: "grid",
              gap: "12px",
            },
            "& .MuiTextField-root": {
              width: "100%",
            },
          }}
        >
          <TextField
            label={
              editUsernameValue === username
                ? "Same username detected"
                : usernameExist
                ? "Username already exist"
                : "Enter new name"
            }
            variant='outlined'
            value={editUsernameValue}
            error={editUsernameValue === username || usernameExist}
            onChange={(e) => setEditUsernameValue(e.target.value)}
            defaultValue={username}
          />

          <Box
            sx={{
              "&": {
                display: "grid",
                gap: 1,
                gridTemplateColumns: "1fr auto",
              },

              "& .MuiButton-contained": {
                boxShadow: "none",
              },
            }}
          >
            <TextField
              label={
                selectedImage !== ""
                  ? "Custom profile"
                  : !isImageLinkValid
                  ? "Invalid link"
                  : "Edit image link"
              }
              variant='outlined'
              value={selectedImage !== "" ? selectedImage : editImageLinkValue}
              disabled={selectedImage !== ""}
              onChange={(e) => setEditImageLinkValue(e.target.value)}
              defaultValue={profileImageLink}
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

        {/* Fix error: DOM handling */}
        <SelectProfileImage
          imageLinkValue={editImageLinkValue}
          setSelectedImage={setSelectedImage}
        />

        <Box
          sx={{
            "&": {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
            },
          }}
        >
          <Button variant='contained' type='submit' disabled={userInputError}>
            Edit info
          </Button>

          <Button
            variant='contained'
            color='error'
            onClick={() => setToggleEditProfile(false)}
          >
            Close
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ProfileRibbon;
