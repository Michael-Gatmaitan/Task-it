import React from "react";
import { titleChanger } from "../../app/titleChanger";
import { motion } from "framer-motion";

import { variantsForPages } from "../../framer-motion-variants";

const Contact: React.FC = () => {
  titleChanger({ title: "Contact" });

  return (
    <motion.div className='contact page' {...variantsForPages}>
      Contact
    </motion.div>
  );
};

// const list = {
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.5,
//     },
//   },
//   hidden: {
//     opacity: 0,
//     transition: { when: "afterChildren", staggerChildren: 0.5 },
//   },
// };

// const item = {
//   visible: {
//     opacity: 1,
//     x: 0,
//   },
//   hidden: {
//     opacity: 0,
//     x: -100,
//   },
// };

// const [opened, setOpened] = useState<boolean>(false);

// <motion.ul
//   // initial="hidden"
//   // animate="visible"
//   animate={opened ? "visible" : "hidden"}
//   variants={list}
//   onClick={() => setOpened((p) => !p)}
// >
//   <motion.li variants={item}>LIST</motion.li>
//   <motion.li variants={item}>LIST</motion.li>
//   <motion.li variants={item}>LIST</motion.li>
// </motion.ul>

// return (
// );
export default Contact;
