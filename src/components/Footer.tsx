import React from "react";
import { Button, TextField } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <div className='developer-info'></div>

      <form className='send-email-form'></form>

      <div className='start-creating'>
        <div className='header2'>Start creating projects!</div>

        <Button variant='contained'>Let's get started</Button>
      </div>
    </div>
  );
};

export default Footer;
