import React, { lazy, Suspense } from "react";
import { titleChanger } from "../../app/titleChanger";
import { motion } from "framer-motion";

import "../styles/About.css";

// Logos
import ReactLogo from "../../assets/techs-tools/react.svg";
import ReduxLogo from "../../assets/techs-tools/rtk.svg";
import FramerMotionLogo from "../../assets/techs-tools/framer-motion.svg";
import MUILogo from "../../assets/techs-tools/mui.svg";
import TypescriptLogo from "../../assets/techs-tools/ts.svg";
import ViteLogo from "../../assets/techs-tools/vite.svg";
import NetlifyLogo from "../../assets/techs-tools/netlify.svg";
import SCSSLogo from "../../assets/techs-tools/scss.svg";

import GithubLogo from "../../assets/social-media/github.svg";

import { staggerAnimation } from "../../framer-motion-variants";

const TechCard = lazy(() => import("./about/TechCard"));

const techsAndTools = [
  {
    imgSrc: ReactLogo,
    title: "React",
    label: "Frontend library",
    link: "https://react.dev",
    key: 1,
  },
  {
    imgSrc: ReduxLogo,
    title: "Redux toolkit",
    label: "State management",
    link: "https://redux-toolkit.js.org",
    key: 2,
  },
  {
    imgSrc: FramerMotionLogo,
    title: "Framer motion",
    label: "Animation library",
    link: "https://framer.com",
    key: 3,
  },
  {
    imgSrc: MUILogo,
    title: "Material UI",
    label: "Ract comp. library",
    link: "https://mui.com",
    key: 4,
  },
  {
    imgSrc: TypescriptLogo,
    title: "Typescript",
    label: "Superset of Javascript",
    link: "https://typescriptlang.org",
    key: 5,
  },
  {
    imgSrc: ViteLogo,
    title: "Vite",
    label: "Frontend tooling",
    link: "https://vitejs.dev",
    key: 6,
  },
  {
    imgSrc: NetlifyLogo,
    title: "Netlify",
    label: "Deployment",
    link: "https://netlify.com",
    key: 7,
  },
  {
    imgSrc: SCSSLogo,
    title: "SCSS",
    label: "Styling",
    link: "https://sass-lang.com",
    key: 8,
  },
];

const About: React.FC = () => {
  titleChanger({ title: "About" });

  return (
    <motion.div
      className='about page'
      variants={staggerAnimation.container}
      initial='hidden'
      animate='show'
    >
      <motion.div variants={staggerAnimation.item} className='header1'>
        About
      </motion.div>

      <motion.div
        variants={staggerAnimation.item}
        className='about-description body-text'
      >
        Taskit is a project management website inspired by trello for using
        kanban style for managing tasks developed in March 2023 designed &
        developed by Michael Gatmaitan a aspiring front-end developer located at
        the Philippines 🖐.
      </motion.div>

      <div className='struct-and-func'>
        <motion.div variants={staggerAnimation.item} className='header3'>
          Structure and functionalities
        </motion.div>
        <motion.div
          variants={staggerAnimation.item}
          className='saf-description body-text'
        >
          Taskit uses local storage to store information about the user’s
          projects, boards, and cards. Taskit is built with React JS for its
          front-end, the Redux toolkit for handling states that include projects
          of the user, and SCSS for more advanced features, easy styling of
          elements, and responsiveness 👌.
        </motion.div>
      </div>

      <div className='techs-tools'>
        <motion.div variants={staggerAnimation.item} className='header3'>
          Techs & tools I used
        </motion.div>

        <motion.div
          variants={staggerAnimation.item}
          className='techs-card-container'
        >
          {techsAndTools.map((tech) => (
            <Suspense fallback={<div>Ediwow</div>}>
              <TechCard
                variantItem={staggerAnimation.item}
                imgSrc={tech.imgSrc}
                techTitle={tech.title}
                techLabel={tech.label}
                techLink={tech.link}
              />
            </Suspense>
          ))}
        </motion.div>
      </div>

      <div className='visit-gh-repo'>
        <motion.div variants={staggerAnimation.item} className='header3'>
          Visit github repo 👨‍💻
        </motion.div>
        <motion.a
          variants={staggerAnimation.item}
          href='https://github.com/Michael-Gatmaitan/Task-it'
          target='_blank'
          className='visit-gh-repo-button'
        >
          <div className='btn-gh-logo'>
            <img src={GithubLogo} alt='Visit github repo' />
          </div>
          <div className='btn-gh-txt'>Go to github repo</div>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default About;
