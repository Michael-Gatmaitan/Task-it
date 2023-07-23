import React from "react";
import { titleChanger } from "../../app/titleChanger";

const Settings: React.FC = () => {
  titleChanger({ title: "Settings" });
  return <div className='settings page'>Settings</div>;
};

export default Settings;
