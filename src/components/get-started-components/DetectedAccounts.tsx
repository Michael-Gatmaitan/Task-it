import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../app/types";

// Redux reducers and states
import { getDeviceAccounts, setActiveUser } from "../../slices/userSlice";

const DetectedAccounts: React.FC = () => {
  const users: User[] = useAppSelector(getDeviceAccounts);

  // Display only if there is 1 or more user in device
  return users.length !== 0 ? (
    <div className='detected-accounts'>
      <div className='header header2'>Detected accounts</div>
      <div className='detected-account-list'>
        {users.map((user: User, userKey) => (
          <DisplayAccount user={user} key={userKey} />
        ))}
      </div>
    </div>
  ) : null;
};

const DisplayAccount: React.FC<{ user: User }> = (props) => {
  const dispatch = useAppDispatch();
  const { user } = props;

  return (
    <div className='detected-account bordered-container' key={user.userID}>
      <div className='account-info'>
        <div className='account-image'>
          <img src={user.profileImageLink} width='50' />
        </div>

        <div className='account-username'>{user.username}</div>
      </div>
      <button
        className='default-button select-account-button'
        onClick={() => dispatch(setActiveUser(user))}
      >
        Select account
      </button>
    </div>
  );
};

export default DetectedAccounts;
