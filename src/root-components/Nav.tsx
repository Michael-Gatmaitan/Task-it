import React from "react";
import { Link, NavLink } from "react-router-dom";

// Components
import ProfileRibbon from "../components/ProfileRibbon";

// CSS
import "../components/styles/Nav.css";

// MUI
import { Button, Tooltip } from "@mui/material";
import { MenuRounded, CloseRounded } from "@mui/icons-material";

// Redux
import { getUserLoggedIn } from "../slices/userSlice";
import { useAppSelector } from "../app/hooks";

import { staggerAnimation } from "../framer-motion-variants";

import { motion } from "framer-motion";

import type { NavButtons } from "../types/types";

interface NavProps {
  navBarButtons: NavButtons;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  const { navBarButtons, toggleSidebar, setToggleSidebar } = props;

  const loggedIn = useAppSelector(getUserLoggedIn);

  return (
    <motion.nav
      variants={staggerAnimation.container}
      initial='hidden'
      animate='show'
      key='nav'
    >
      {/* Logo */}
      <div className='logo-container'>
        <motion.div
          variants={staggerAnimation.item}
          className='logo'
        ></motion.div>
        <motion.div variants={staggerAnimation.item} className='taskit-text'>
          Taskit
        </motion.div>
      </div>

      {/* Buttons */}
      <div className='nav-buttons'>
        {navBarButtons.centerButtons.map((button, key) => (
          <Tooltip title={button.text} placement='bottom' key={key}>
            <motion.div
              whileTap={{ scale: 0.97 }}
              variants={staggerAnimation.item}
              className='navlink-wrapper-desktop'
            >
              <NavLink to={button.path}>
                <button.Icon />
                <span>{button.text}</span>
              </NavLink>
            </motion.div>
          </Tooltip>
        ))}
      </div>

      {/* Menu */}
      <motion.div
        variants={staggerAnimation.item}
        className='menu-container'
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        {toggleSidebar ? (
          <CloseRounded fontSize='large' />
        ) : (
          <MenuRounded fontSize='large' />
        )}
      </motion.div>

      {/* Desktop side buttons */}
      {loggedIn === false ? (
        <div className='get-started-button-container'>
          <Link to={"/get-started"}>
            <Button
              component={motion.div}
              variants={staggerAnimation.item}
              variant='outlined'
            >
              Get started
            </Button>
          </Link>
        </div>
      ) : (
        <ProfileRibbon platform='desktop' />
      )}
    </motion.nav>
  );
};

export default Nav;
