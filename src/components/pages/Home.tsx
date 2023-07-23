import React from "react";
import "../styles/Home.css";
// MUI
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { titleChanger } from "../../app/titleChanger";

const Home: React.FC = () => {
  titleChanger({ title: "Home" });

  const cardValues = [
    {
      cardTitle: "Project",
      cardDescription: `This will act as your Project's parent component, where
        Boards and Cards are placed. Enjoy creating projects by using
        Taskit as your project organizer.`,
    },
    {
      cardTitle: "Boards",
      cardDescription: `Boards will act as container of your cards, boards can have a 
        label like “On going”, “Processing” , “Done”. Just like a Kanban 
        board, this will make you see the progress.`,
    },
    {
      cardTitle: "Cards",
      cardDescription: `Boards will act as container of your cards, boards can have a 
        label like “On going”, “Processing” , “Done”. Just like a Kanban board, 
        this will make you see the progress.`,
    },
  ];

  return (
    <div className='home page'>
      <div className='header-container'>
        <div className='main-headers'>
          <div className='header1'>Organize your projects using Taskit</div>

          <div className='description-container'>
            <div className='header-text-description'>
              Taskit is a tool for organizing assignments or projects that will
              make your workflow easy and faster to accomplish using Kanban
              style.
            </div>

            <div>
              <Link to='/get-started'>
                <Button variant='contained'>Let's get started</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='sub-headers'>
          <div className='sub-header-container'>
            <div className='header2'>Backendless</div>

            <div className='body-text'>
              Taskit saves data on device's local storage that makes it fast to
              access all the data you store.
            </div>
          </div>

          <div className='sub-header-container'>
            <div className='header2'>All ready, already</div>

            <div className='body-text'>
              Taskit has features you need to organize your projects and making
              workflow easier to maintain.
            </div>
          </div>
        </div>
      </div>

      <div className='cards'>
        {cardValues.map((card, i) => (
          <div className='card-container bordered-container' key={i}>
            <div className='card-presenter bordered-container'></div>

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
    </div>
  );
};

export default Home;
