import React from "react";
import DetectedAccounts from "../get-started-components/DetectedAccounts";
import CreateAccount from "../get-started-components/CreateAccount";

import "../styles/getStarted.css";

// Getters of userSlice

const GetStarted: React.FC = () => (
  <div className='get-started page'>
    <DetectedAccounts />
    <CreateAccount />
  </div>
);

export default GetStarted;
