import React from "react";

// MUI
import { Button } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div className='home page'>
      <Button variant='outlined'>Button</Button>
      <button className='default-button'>Button</button>
      {/* Home page <Button variant='outlined'>Button</Button> */}
      <Button variant='contained'>Button</Button>
    </div>
  );
};

export default Home;
