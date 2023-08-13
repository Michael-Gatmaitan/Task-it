import React from "react";
// import { Button } from "@mui/material";
import { titleChanger } from "../../app/titleChanger";
import { motion } from "framer-motion";

import { staggerAnimation } from "../../framer-motion-variants";

import Github from "../../assets/social-media/github.svg";
import Facebook from "../../assets/social-media/facebook.svg";
import Instagram from "../../assets/social-media/instagram.svg";
import Upwork from "../../assets/social-media/upwork.svg";
import Fiverr from "../../assets/social-media/fiverr.svg";
import Twitter from "../../assets/social-media/twitter.svg";

import "../styles/Contact.css";

const social_medias = [
  {
    title: "Github",
    src: Github,
    key: 1,
    link: "https://michaelgatmaitan.netlify.app",
  },
  {
    title: "Facebook",
    src: Facebook,
    key: 2,
    link: "https://www.facebook.com/michael.gatmaitan29/",
  },
  {
    title: "Instagram",
    src: Instagram,
    key: 3,
    link: "https://instagram.com/jabikel?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D",
  },
  {
    title: "Fiverr",
    src: Fiverr,
    key: 4,
    link: "https://michaelgatmaitan.netlify.app",
  },
  {
    title: "Upwork",
    src: Upwork,
    key: 5,
    link: "https://michaelgatmaitan.netlify.app",
  },
  {
    title: "Twitter",
    src: Twitter,
    key: 6,
    link: "https://michaelgatmaitan.netlify.app",
  },
];

const Contact: React.FC = () => {
  titleChanger({ title: "Contact" });

  return (
    <motion.div
      className='contact page'
      variants={staggerAnimation.container}
      initial='hidden'
      animate='show'
    >
      <motion.div variants={staggerAnimation.item} className='header2'>
        Contact
      </motion.div>

      <div className='more-info'>
        <motion.a variants={staggerAnimation.item} href='mchlgtmtn@gmail.com'>
          mchlgtmtn@gmail.com
        </motion.a>
        <motion.p variants={staggerAnimation.item} className='label'>
          09499693314
        </motion.p>
        <motion.p variants={staggerAnimation.item} className='label'>
          Marilao, Bulacan, Philippines 3019
        </motion.p>
      </div>

      <div className='socmed-container'>
        <motion.div
          variants={staggerAnimation.item}
          className='header3 socmed-header'
        >
          Connect with me 🎈
        </motion.div>
        <div className='socmeds'>
          {social_medias.map((icon) => (
            <motion.a
              variants={staggerAnimation.item}
              href={icon.link}
              target='_blank'
              className='socmed-link-tag'
              key={icon.key}
            >
              <img src={icon.src} alt={icon.title} loading='lazy' />
            </motion.a>
          ))}
        </div>
      </div>

      <div className='buymeacoffee'>
        <motion.div variants={staggerAnimation.item} className='header3'>
          Buy me a coffee ☕
        </motion.div>
        <motion.a
          variants={staggerAnimation.item}
          href='https://www.buymeacoffee.com/michael-gatmaitan'
          className='buymeacoffee-button'
          target='_blank'
        >
          <button>Buy me a coffee ☕</button>
        </motion.a>
      </div>

      <div className='my-portfolio'>
        <motion.div variants={staggerAnimation.item} className='header3'>
          My web portfolio 🙋‍♂️
        </motion.div>
        <motion.div
          variants={staggerAnimation.item}
          className='my-portfolio-link'
        >
          <a href='https://michaelgatmaitan.netlify.app' target='_blank'>
            <u>https://michaelgatmaitan.netlify.app</u>
          </a>
        </motion.div>
      </div>
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
