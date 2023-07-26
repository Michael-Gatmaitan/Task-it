import React from "react";
import { titleChanger } from "../../app/titleChanger";
import { motion } from "framer-motion";
import { variantsForPages } from "../../framer-motion-variants";

const Settings: React.FC = () => {
  titleChanger({ title: "Settings" });
  return (
    <motion.div className='settings page' {...variantsForPages}>
      Settings
    </motion.div>
  );
};

export default Settings;
