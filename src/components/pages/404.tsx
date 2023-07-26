import React from "react";
import { titleChanger } from "../../app/titleChanger";
import { motion } from "framer-motion";
import { variantsForPages } from "../../framer-motion-variants";

const Page404: React.FC = () => {
  titleChanger({ title: "Page not found." });

  return (
    <motion.div className='404 page' {...variantsForPages}>
      <h1>Page not found</h1>
    </motion.div>
  );
};

export default Page404;
