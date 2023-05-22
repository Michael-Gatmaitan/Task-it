import React, { useState, useRef, useEffect } from "react";
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
        username: usernameRef.current.value,
        profileImageLink: imageLinkRef.current.value,
        projects: [],
        userID: users.length + 1,
      };

      console.log(userInputError);

      dispatch(addUserAccount(newUser));
      dispatch(setActiveUser(newUser));

      usernameRef.current.value = "";
      imageLinkRef.current.value = "";
      usernameRef.current.focus();

      setInvalidInput(true);
    }
  };

  // Button disabled by default
  const [invalidInput, setInvalidInput] = useState(true);

  const checkValidation = () =>
    setInvalidInput(
      usernameRef.current?.value === "" || imageLinkRef.current?.value === ""
    );

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
            <input
              type='text'
              className='text-box'
              placeholder='Username'
              name='username'
              ref={usernameRef}
              onChange={checkValidation}
            />
            <input
              type='text'
              className='text-box'
              placeholder='Profile Image Link'
              name='profile-image-link'
              ref={imageLinkRef}
              onChange={checkValidation}
            />

            <input
              type='submit'
              value='Create account'
              className='default-button create-account-button'
              disabled={invalidInput}
            />
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
