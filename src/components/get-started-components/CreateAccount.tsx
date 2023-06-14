import React, { useState, useEffect } from "react";
import SelectProfileImage from "../reusable/selectProfileImage/SelectProfileImage";

// MUI Components
import { Button, TextField } from "@mui/material";

import { User } from "../../app/types";

// Hooks
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Reducers
import {
  // Reducers
  addUserAccount,

  // Getters of userSlice
  getDeviceAccounts,
  getUserInputError,

  // Setters
  setActiveUser,
  setUserInputError,
} from "../../slices/userSlice";

const CreateAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(getDeviceAccounts);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      username: usernameValue,
      profileImageLink: imageLinkValue === "" ? selectedImage : imageLinkValue,
      projects: [],
      userID: users.length === 0 ? 0 : users[users.length - 1].userID + 1,
    };

    dispatch(addUserAccount(newUser));
    dispatch(setActiveUser(newUser));

    console.log(userInputError);

    setUsernameValue("");
    setImageLinkValue("");
  };

  // Button disabled by default
  const [invalidInput, setInvalidInput] = useState<boolean>(true);

  // State values
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [imageLinkValue, setImageLinkValue] = useState<string>("");

  // Selecting custom profile image states
  const [selectedImage, setSelectedImage] = useState<string>("");

  const userInputError = useAppSelector(getUserInputError);

  useEffect(() => {
    // Disable 'create acount' button if 1 or both of input is empty.
    setInvalidInput(
      usernameValue.trim() === "" ||
        (imageLinkValue.trim() === "" && selectedImage === "")
    );
  }, [usernameValue, imageLinkValue, selectedImage]);

  useEffect(() => {
    // This variable changes its value on /* userReducers.ts */

    if (userInputError === true) {
      document.getElementById("create-account-username")?.focus();
      setTimeout(() => {
        console.log("Closing the input error message.");
        dispatch(setUserInputError(false));
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInputError]);

  useEffect(() => setImageLinkValue(""), [selectedImage]);

  return (
    <div className='create-account'>
      <div className='header header2'>Create account Locally</div>

      <div className='form-container bordered-container'>
        <form
          id='create-account-form'
          name='create-account-form'
          onSubmit={handleSubmit}
        >
          <TextField
            variant='outlined'
            label='Username'
            required
            value={usernameValue}
            id='create-account-username'
            onChange={(e) => setUsernameValue(e.target.value)}
          />

          <TextField
            variant='outlined'
            label='Profile image link'
            required
            value={selectedImage !== "" ? selectedImage : imageLinkValue}
            disabled={selectedImage !== ""}
            onChange={(e) => setImageLinkValue(e.target.value)}
          />

          <SelectProfileImage
            setSelectedImage={setSelectedImage}
            imageLinkValue={imageLinkValue}
          />

          <Button type='submit' variant='contained' disabled={invalidInput}>
            Create account
          </Button>
        </form>
      </div>

      {userInputError ? (
        <div className='input-error-message'>
          That username already exist, please try another.
        </div>
      ) : null}
    </div>
  );
};

export default CreateAccount;
