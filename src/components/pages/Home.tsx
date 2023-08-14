import React from "react";
import "../styles/Home.css";
// MUI
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { titleChanger } from "../../app/titleChanger";

// Framer motion
import { motion } from "framer-motion";
import { variantsForPages } from "../../framer-motion-variants";

import ProjectsSVG from "../../assets/presents/projects-present.svg";
import BoardsSVG from "../../assets/presents/boards-present.svg";
import CardsSVG from "../../assets/presents/cards-present.svg";

const Home: React.FC = () => {
  titleChanger({ title: "Home" });

  const staggerParent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const staggerTexts = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const cardValues = [
    {
      cardTitle: "Project",
      cardDescription: `This will act as your Project's parent component, where
        Boards and Cards are placed. Enjoy creating projects by using
        Taskit as your project organizer.`,
      svg: ProjectsSVG,
    },
    {
      cardTitle: "Boards",
      cardDescription: `Boards will act as container of your cards, boards can have a 
        label like “On going”, “Processing” , “Done”. Just like a Kanban 
        board, this will make you see the progress.`,
      svg: BoardsSVG,
    },
    {
      cardTitle: "Cards",
      cardDescription: `Boards will act as container of your cards, boards can have a 
        label like “On going”, “Processing” , “Done”. Just like a Kanban board, 
        this will make you see the progress.`,
      svg: CardsSVG,
    },
  ];

  return (
    <motion.div className='home page' {...variantsForPages}>
      <motion.div
        variants={staggerParent}
        initial='hidden'
        animate='show'
        className='header-container'
      >
        <div className='main-headers'>
          <motion.div variants={staggerTexts} className='header1'>
            Organize your projects using Taskit
          </motion.div>

          <div className='description-container'>
            <motion.div
              variants={staggerTexts}
              className='header-text-description'
            >
              Taskit is a tool for organizing assignments or projects that will
              make your workflow easy and faster to accomplish using Kanban
              style.
            </motion.div>

            <div>
              <Link to='/get-started'>
                <Button
                  variant='contained'
                  variants={staggerTexts}
                  component={motion.div}
                >
                  Let's get started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='sub-headers'>
          <div className='sub-header-container'>
            <motion.div variants={staggerTexts} className='header2'>
              Backendless
            </motion.div>

            <motion.div variants={staggerTexts} className='body-text'>
              Taskit saves data on device's local storage that makes it fast to
              access all the data you store.
            </motion.div>
          </div>

          <div className='sub-header-container'>
            <motion.div variants={staggerTexts} className='header2'>
              All ready, already
            </motion.div>

            <motion.div variants={staggerTexts} className='body-text'>
              Taskit has features you need to organize your projects and making
              workflow easier to maintain.
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className='cards'>
        {cardValues.map((card, i) => (
          <div className='card-container bordered-container' key={i}>
            <div className='card-presenter bordered-container'>
              <img src={card.svg} alt={card.cardTitle} loading='lazy' />
            </div>

            <div className='card-info'>
              <div className='home-card-title header2'>{card.cardTitle}</div>

              <div className='card-description body-text'>
                {card.cardDescription}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='why'>
        <div className='why-title'>Why?</div>

        <div className='why-description body-text'>
          Taskit is a tool for organizing projects, activities, assignments for
          you, specially for students. It is designed and developed by a 1st
          year BSIT student from Philippines that wants to help students to
          organize their works easily for more motivation nad inspiration.
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
