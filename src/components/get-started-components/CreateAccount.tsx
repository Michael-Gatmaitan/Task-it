import React, { useState, useRef, useEffect } from "react";

// MUI Components
import { Button, TextField } from "@mui/material";

import { User } from "../../app/types";
// Hooks
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Reducers
import {
  // Reducers
  addUserAccount,

  // Getters of userSlicex`
  getDeviceAccounts,
  getUserInputError,

  // Setters
  setActiveUser,
  setUserInputError,
} from "../../slices/userSlice";

const CreateAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(getDeviceAccounts);

  const usernameRef = useRef<HTMLInputElement>(null);
  const imageLinkRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set key pair localstorage of user

    if (usernameRef.current != undefined && imageLinkRef.current != undefined) {
      const newUser: User = {
        username: usernameValue,
        profileImageLink: imageLinkValue,
        projects: [],
        userID: users.length + 1,
      };

      dispatch(addUserAccount(newUser));
      dispatch(setActiveUser(newUser));

      setUsernameValue("");
      setImageLinkValue("");
      usernameRef.current.focus();

      setInvalidInput(true);
    }
  };

  // Button disabled by default
  const [invalidInput, setInvalidInput] = useState<boolean>(true);

  // State values
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [imageLinkValue, setImageLinkValue] = useState<string>("");

  const checkValidation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStateFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setStateFunc(e.target.value);
    setInvalidInput(usernameValue === "" || imageLinkValue === "");
  };

  const userInputError = useAppSelector(getUserInputError);

  useEffect(() => {
    if (userInputError === true) {
      setTimeout(() => {
        console.log("Closing the input error message.");
        dispatch(setUserInputError(false));
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInputError]);

  return (
    <>
      <div className='create-account'>
        <div className='header header2'>Create account Locally</div>

        <div className='form-container bordered-container'>
          <form
            id='create-account-form'
            name='create-account-form'
            onSubmit={handleSubmit}
          >
            {/* <input
              type='text'
              className='text-box'
              placeholder='Username'
              name='username'
              ref={usernameRef}
              onChange={checkValidation}
            /> */}
            {/* <input
              type='text'
              className='text-box'
              placeholder='Profile Image Link'
              name='profile-image-link'
              ref={imageLinkRef}
              onChange={checkValidation}
            /> */}
            <TextField
              variant='outlined'
              label='Username'
              onChange={(e) => checkValidation(e, setUsernameValue)}
              ref={usernameRef}
            />

            <TextField
              variant='outlined'
              label='Profile image link'
              onChange={(e) => checkValidation(e, setImageLinkValue)}
              ref={imageLinkRef}
            />

            <Button type='submit' variant='contained' disabled={invalidInput}>
              Create account
            </Button>
          </form>
        </div>
      </div>

      {userInputError && (
        <div className='input-error-message'>
          That username already exist, please try another.
        </div>
      )}
    </>
  );
};

export default CreateAccount;
