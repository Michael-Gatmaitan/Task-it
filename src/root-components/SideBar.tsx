import React from "react";
import { getActiveUser, logoutUser } from "../slices/userSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

interface SideBarProps {
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const dispatch = useAppDispatch();

  const { toggleSideBar, setToggleSideBar } = props;

  const activeUser = useAppSelector(getActiveUser);

  return (
    <div
      className={`sidebar ${!toggleSideBar ? "hide-sidebar" : ""}`}
      onClick={() => setToggleSideBar(false)}
    >
      {activeUser.username}
      {activeUser.username && activeUser.username !== "" && (
        <div className='active-user-card'>
          <div className='username'>{activeUser.username}</div>
          {/* <img src={} alt="user-altar" /> */}
        </div>
      )}

      <button
        onClick={() => {
          console.log("Logged out");
          dispatch(logoutUser());
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
