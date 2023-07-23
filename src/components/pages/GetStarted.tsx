import React from "react";
import DetectedAccounts from "../get-started-components/DetectedAccounts";
import CreateAccount from "../get-started-components/CreateAccount";
import { titleChanger } from "../../app/titleChanger";

import "../styles/getStarted.css";

// framer-motion
import { AnimatePresence, motion } from "framer-motion";

const variant = {
  hidden: { opacity: 0 },
  opened: { opacity: 1 },
  exit: { opacity: 1 },
};

const GetStarted: React.FC = () => {
  titleChanger({ title: "Get Started" });

  return (
    <AnimatePresence>
      <motion.div
        className='get-started page'
        variants={variant}
        initial='hidden'
        animate='opened'
        exit={"exit"}
        key={"getStarted"}
        transition={{ duration: 3 }}
      >
        <DetectedAccounts />
        <CreateAccount />
      </motion.div>
    </AnimatePresence>
  );
};

export default GetStarted;
