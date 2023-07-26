import React from "react";
import DetectedAccounts from "../get-started-components/DetectedAccounts";
import CreateAccount from "../get-started-components/CreateAccount";
import { titleChanger } from "../../app/titleChanger";

import "../styles/getStarted.css";

// framer-motion
import { motion } from "framer-motion";
import { variantsForPages } from "../../framer-motion-variants";

const GetStarted: React.FC = () => {
  titleChanger({ title: "Get Started" });

  return (
    <motion.div className='get-started page' {...variantsForPages}>
      <DetectedAccounts />
      <CreateAccount />
    </motion.div>
  );
};

export default GetStarted;
