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

const CreateAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: User[] = useAppSelector(getDeviceAccounts);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      username: usernameValue,
      profileImageLink: imageLinkValue === "" ? selectedImage : imageLinkValue,
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
            value={imageLinkValue}
            disabled={selectedImage !== ""}
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

interface SelectProfileImageProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  imageLinkValue: string;
}

const SelectProfileImage: React.FC<SelectProfileImageProps> = (props) => {
  const { setSelectedImage, imageLinkValue } = props;

  const profile_images: string[] = [
    "./profile-images/profile_image_1.png",
    "./profile-images/profile_image_2.png",
    "./profile-images/profile_image_3.png",
    "./profile-images/profile_image_4.png",
    "./profile-images/profile_image_5.png",
    "./profile-images/profile_image_6.png",
  ];

  const activateTile = (profile_image: string) => {
    const profile_image_els: Array<Element> = [
      ...document.getElementsByClassName("profile-image"),
    ];

    if (profile_image_els === undefined) return;

    const idx = profile_images.findIndex((img) => img === profile_image);

    if (profile_image_els[idx].classList.contains("selected-profile")) {
      profile_image_els[idx].classList.remove("selected-profile");
      setSelectedImage("");
      return;
    }

    profile_image_els.map((el, i) => {
      if (i === idx) el.classList.add("selected-profile");
      else el.classList.remove("selected-profile");
    });

    setSelectedImage(profile_image);
  };

  return (
    <div
      className='select-profile-images'
      style={{
        opacity: imageLinkValue.trim() !== "" ? 0.6 : 1,
        pointerEvents: imageLinkValue.trim() !== "" ? "none" : "auto",
      }}
    >
      <div className='header2'>Select profile image</div>
      <div className='profile-images'>
        {profile_images.map((profile_image, i) => (
          <div
            className='profile-image'
            onClick={() => activateTile(profile_image)}
            key={i}
          >
            <img src={profile_image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateAccount;
