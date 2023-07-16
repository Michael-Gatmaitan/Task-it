import React, { useState, useEffect, useDeferredValue } from "react";
import SelectProfileImage from "./reusable/selectProfileImage/SelectProfileImage";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  editProfileInformation,
  getActiveUser,
  getUserLoggedIn,
} from "../slices/userSlice";

import "./styles/ProfileRibbon.css";
import { Box, Button, TextField } from "@mui/material";
import {
  ExpandMoreRounded,
  ExpandLessRounded,
  CloseRounded,
} from "@mui/icons-material";
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

    setDisablePreviewImage(false);
    setPreviewImage(false);

    // Set all state value to empty.
    if (deferredEditUsernameValue !== username) setEditUsernameValue(username);

    if (deferredEditImageLinkValue !== profileImageLink)
      setEditImageLinkValue(profileImageLink);
  };

  // Deferred value for editUsernameValue state.
  const [editUsernameValue, setEditUsernameValue] = useState<string>("");
  const deferredEditUsernameValue = useDeferredValue(editUsernameValue);

  // Deferred value for editImageLinkValue state.
  const [editImageLinkValue, setEditImageLinkValue] = useState<string>("");
  const deferredEditImageLinkValue = useDeferredValue(editImageLinkValue);

  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [disablePreviewImage, setDisablePreviewImage] =
    useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string>("");

  const [userInputError, setUserInputError] = useState<boolean>(true);

  // custom hook that validates exists username.
  const usernameExist = useIsUsernameExist(deferredEditUsernameValue);

  useEffect(() => {
    const usernameVal = deferredEditUsernameValue.trim();
    const imgVal = deferredEditImageLinkValue.trim();

    setUserInputError(
      usernameVal.trim() === "" ||
        usernameExist ||
        !isImageLinkValid ||
        imgVal.trim() === ""
    );

    setDisablePreviewImage(imgVal === "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deferredEditUsernameValue,
    deferredEditImageLinkValue,
    username,
    selectedImage,
    usernameExist,
  ]);

  const handleEditProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Edit Submitted.");

    dispatch(
      editProfileInformation({
        username: deferredEditUsernameValue,
        profileImageLink:
          selectedImage !== "" ? selectedImage : deferredEditImageLinkValue,
      })
    );

    // since we used useEffect in toggleEditProfile that triggers
    // setDeafaultValueOfSTates(), we will directly closing it using
    // it's setState
    setToggleEditProfile(false);
  };

  useEffect(() => {
    if (!toggleEditProfile) setDefaultValueOfStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleEditProfile]);

  const isImageLinkValid = useImageLinkChecker(deferredEditImageLinkValue);

  useEffect(() => {
    console.log(
      `Profile image link validation ${isImageLinkValid ? "passed" : "failed"}`
    );
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
              deferredEditUsernameValue === username
                ? "Same username detected"
                : usernameExist
                ? "Username already exist"
                : "Enter new name"
            }
            variant='outlined'
            error={deferredEditUsernameValue === username || usernameExist}
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
              // disabled={selectedImage !== ""}
              onChange={(e) => setEditImageLinkValue(e.target.value)}
              error={!isImageLinkValid || selectedImage !== ""}
              defaultValue={
                selectedImage !== "" ? selectedImage : profileImageLink
              }
            />

            <Button
              variant='contained'
              disabled={disablePreviewImage || !isImageLinkValid}
              onClick={() => setPreviewImage(true)}
            >
              Preview image
            </Button>
          </Box>
        </Box>

        {previewImage && deferredEditImageLinkValue !== "" ? (
          <div className='image-preview'>
            {isImageLinkValid ? (
              <div className='image-previewer'>
                <div
                  className='close-image-previewer'
                  onClick={() => setPreviewImage(false)}
                >
                  <CloseRounded />
                </div>
                <img src={deferredEditImageLinkValue} loading='lazy' />
              </div>
            ) : (
              <div>Image link is not valid</div>
            )}
          </div>
        ) : null}

        {/* Fix error: DOM handling */}
        <SelectProfileImage
          imageLinkValue={deferredEditImageLinkValue}
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
