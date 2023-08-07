import React from "react";

import { NavLink } from "react-router-dom";

// CSS
import "../components/styles/Sidebar.css";

import type { NavButtons } from "../types/types";
import ProfileRibbon from "../components/ProfileRibbon";

import { motion } from "framer-motion";
import { staggerAnimation } from "../framer-motion-variants";

// Reducers and getters, top: Reducers, bottom: Getters

interface SideBarProps {
  navBarButtons: NavButtons;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { navBarButtons, setToggleSidebar } = props;

  return (
    <motion.div
      variants={staggerAnimation.container}
      initial='hidden'
      animate='show'
      className='sidebar'
    >
      <ProfileRibbon platform='mobile' />

      <div className='sidebar-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <motion.div
            whileTap={{ scale: 0.97 }}
            variants={staggerAnimation.item}
            className='navlink-wrapper'
            key={key}
          >
            <NavLink
              to={button.path}
              className='header2 sidebar-button'
              onClick={() => setToggleSidebar(false)}
            >
              <button.Icon fontSize='large' />
              {button.text}
            </NavLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SideBar;
