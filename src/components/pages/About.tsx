import React from "react";
import { titleChanger } from "../../app/titleChanger";
import { motion } from "framer-motion";
import { variantsForPages } from "../../framer-motion-variants";

const About: React.FC = () => {
  titleChanger({ title: "About" });

  return (
    <motion.div className='about page' {...variantsForPages}>
      About
    </motion.div>
  );
};

export default About;
