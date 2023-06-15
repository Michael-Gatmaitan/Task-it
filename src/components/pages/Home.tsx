import React from "react";
import "../styles/Home.css";
// MUI
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className='home page'>
      <div className='header-container'>
        <div className='main-headers'>
          <div className='header1'>Organize your projects using Task-it</div>

          <div className='description-container'>
            <div className='header-text-description'>
              Task-it is a tool for organizing assignments or projects that will
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
    </div>
  );
};

export default Home;
