import React from "react";
import "../styles/getStarted.css";

const GetStarted: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            />
            <input
              type='text'
              className='text-box'
              placeholder='Profile Image Link'
              name='profile-image-link'
            />

            <input
              type='submit'
              value='Create account'
              className='default-button'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
