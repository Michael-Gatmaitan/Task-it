import React from "react";

interface SideBarProps {
  toggleSideBar: boolean;
  setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { toggleSideBar, setToggleSideBar } = props;

  return (
    <div
      className={`sidebar ${!toggleSideBar ? "hide-sidebar" : ""}`}
      onClick={() => setToggleSideBar(false)}
    ></div>
  );
};

export default SideBar;
