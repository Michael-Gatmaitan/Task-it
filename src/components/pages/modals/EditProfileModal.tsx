import React, {
  useEffect,
  useState,
  useDeferredValue,
  useCallback,
} from "react";
import { Button, Box, TextField } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useAppDispatch } from "../../../app/hooks";
import { useImageLinkChecker } from "../../../app/formValidation";

import SelectProfileImage from "../../reusable/selectProfileImage/SelectProfileImage";
import { logoutUser } from "../../../slices/userSlice";
import { editProfileInformation } from "../../../slices/userSlice";

import { motion } from "framer-motion";
import { variantsForModals } from "../../../framer-motion-variants";

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

  const setDefaultValueOfStates = useCallback(() => {
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
  }, [
    deferredEditImageLinkValue,
    deferredEditUsernameValue,
    profileImageLink,
    username,
  ]);

  // custom hook that validates exists username.

  useEffect(() => {
    // const usernameVal = deferredEditUsernameValue.trim();
    const imgVal = deferredEditImageLinkValue.trim();

    // setUserInputError(
    //   usernameVal.trim() === "" || !isImageLinkValid || imgVal.trim() === ""
    // );
    setUserInputError(!isImageLinkValid);

    setDisablePreviewImage(imgVal === "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deferredEditUsernameValue,
    deferredEditImageLinkValue,
    username,
    selectedImage,
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
    <motion.div
      {...variantsForModals}
      className='edit-profile bordered-container'
    >
      <form id='profile-editor' onSubmit={handleEditProfileSubmit}>
        <Box
          sx={{
            "&": { display: "grid", gap: "12px" },
            "& .MuiTextField-root": { width: "100%" },
          }}
        >
          <TextField
            variant='outlined'
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
        <Button
          variant='outlined'
          color='error'
          onClick={() => dispatch(logoutUser())}
        >
          Log out
        </Button>
      </form>
    </motion.div>
  );
};

export default EditProfileModal;
