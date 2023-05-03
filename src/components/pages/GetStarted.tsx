import React, { useState, useRef } from "react";
import { User } from "../../app/types";
import "../styles/getStarted.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUserAccount } from "../../slices/userSlice";

const GetStarted: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(
    (state) => state.userReducer.deviceAccounts
  );

  const usernameRef = useRef<HTMLInputElement>(null);
  const imageLinkRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set key pair localstorage of user
    const newUser: User = {
      username: usernameRef.current?.value || "",
      profileImageLink: imageLinkRef.current?.value || "",
      userID: users.length === 0 ? 1 : users.length + 1,
    };

    dispatch(addUserAccount(newUser));

    // Set login as true
  };

  const [validInput, setValidInput] = useState(false);

  const checkValidation = () => {
    if (
      (usernameRef.current?.value === "" &&
        imageLinkRef.current?.value === "") ||
      usernameRef.current?.value === "" ||
      imageLinkRef.current?.value === ""
    ) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  };

  return (
    <div className='get-started page'>
      <div className='detected-accounts'></div>

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
              className='default-button'
              disabled={validInput}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
