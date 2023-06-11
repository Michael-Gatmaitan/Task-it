import React, { useState, useEffect } from "react";

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

// Profile images imports
import ProfileImage1 from "../../assets/profile-images/profile_image_1.png";
import ProfileImage2 from "../../assets/profile-images/profile_image_2.png";
import ProfileImage3 from "../../assets/profile-images/profile_image_3.png";
import ProfileImage4 from "../../assets/profile-images/profile_image_4.png";
import ProfileImage5 from "../../assets/profile-images/profile_image_5.png";
import ProfileImage6 from "../../assets/profile-images/profile_image_6.png";

const CreateAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(getDeviceAccounts);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      username: usernameValue,
      profileImageLink: imageLinkValue,
      projects: [],
      userID: users[users.length - 1].userID + 1,
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

  const userInputError = useAppSelector(getUserInputError);

  useEffect(() => {
    console.log(usernameValue, imageLinkValue);

    // Disable 'create acount' button if 1 or both of input is empty.
    setInvalidInput(
      usernameValue.trim() === "" || imageLinkValue.trim() === ""
    );
  }, [usernameValue, imageLinkValue]);

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

  // Selecting custom profile image states
  const [selectedImage, setSelectedImage] = useState<string>("");

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
            value={imageLinkValue}
            onChange={(e) => setImageLinkValue(e.target.value)}
          />

          {/* Select image */}
          {/* <div
            className='builtin-images'
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gap: 8,
            }}
          >
            {["red", "blue", "green"].map((color) => (
              <div
                style={{
                  backgroundColor: color,
                  height: 50,
                }}
              ></div>
            ))}
          </div> */}

          <SelectProfileImage setSelectedImage={setSelectedImage} />

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

interface SelectProfileImageProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}

const SelectProfileImage: React.FC<SelectProfileImageProps> = (props) => {
  const { setSelectedImage } = props;

  const profile_images: string[] = [
    ProfileImage1,
    ProfileImage2,
    ProfileImage3,
    ProfileImage4,
    ProfileImage5,
    ProfileImage6,
  ];

  return (
    <div className='select-profile-images'>
      <div className='header2'>Select profile image</div>
      <div className='profile-images'>
        {profile_images.map((profile_image) => (
          <div className='profile-image'>
            <img
              src={profile_image}
              onClick={() => setSelectedImage(profile_image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateAccount;
