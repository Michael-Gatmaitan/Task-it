import React from "react";

// MUI
import { Button, TextField } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div className='home page'>
      <Button variant='outlined'>Button</Button>
      <button className='default-button'>Button</button>
      {/* Home page <Button variant='outlined'>Button</Button> */}
      <Button variant='contained'>Button</Button>

      <TextField
        variant='standard'
        defaultValue='Standard text-field'
        helperText='Text some help'
      />
      <TextField variant='filled' defaultValue='Filled text-field' />
      <TextField variant='outlined' defaultValue='Outlined text-field' />
    </div>
  );
};

export default Home;
