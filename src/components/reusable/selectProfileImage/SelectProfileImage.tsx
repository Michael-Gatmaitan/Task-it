import React, { useEffect, useMemo } from "react";
import "./selectProfileImage.css";

/*
  This component is only used in forms that has
  'imageLinkValue' state for form validation.

  And a 'selectedImage' state for form validation as well.

  We need to take the setState of 'selectedImage' here
  as a prop.
*/

interface SelectProfileImageProps {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  imageLinkValue: string;
}

const SelectProfileImage: React.FC<SelectProfileImageProps> = (props) => {
  const { setSelectedImage, imageLinkValue } = props;

  /* Use 'useMemo' hook to prevent unnecesarry rerender
      or reloading of a variable for every re-render */
  const uid = useMemo(() => Math.floor(Math.random() * Date.now()), []);

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
      ...document.getElementsByClassName(`profile-image-${uid}`),
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
      <div className='header3'>Select profile image</div>
      <div className='profile-images'>
        {profile_images.map((profile_image, i) => (
          <div
            className={`profile-image-${uid} profile-image-root`}
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

export default SelectProfileImage;