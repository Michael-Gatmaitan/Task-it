import React, { useState } from "react";
import { motion } from "framer-motion";

const variant = {
  hidden: { opacity: 0 },
  opened: { opacity: 1 },
  exit: { opacity: 1 },
};

const Contact: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <motion.div
      className='contact page'
      variants={variant}
      initial='hidden'
      animate='opened'
      exit={"exit"}
      key={"contact"}
      transition={{ duration: 3 }}
    >
      Contact
      {isOpened ? (
        <motion.div
          variants={variant}
          initial='hidden'
          animate='opened'
          transition={{ duration: 3 }}
        >
          AAAAAAAAAAAAA
        </motion.div>
      ) : null}
      <button onClick={() => setIsOpened(!isOpened)}>tOGGLE</button>
    </motion.div>
  );
};

export default Contact;
