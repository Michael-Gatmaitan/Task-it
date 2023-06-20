import React from "react";
import { Button, TextField } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Instagram,
  Twitter,
  Facebook,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import "./styles/Footer.css";

const Footer: React.FC = () => {
  const webicons = [
    {
      name: "",
      link: "",
      icon: GitHub,
    },
    {
      name: "",
      link: "",
      icon: LinkedIn,
    },
    {
      name: "",
      link: "",
      icon: Instagram,
    },
    {
      name: "",
      link: "",
      icon: Facebook,
    },
    {
      name: "",
      link: "",
      icon: Twitter,
    },
  ];

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Sending email...");
  };

  return (
    <div className='footer'>
      <div className='developer-info'>
        <div className='head-info'>
          <div className='developer-pic'></div>

          <div className='developer'>
            <div className='label'>Designed and Developed by</div>
            <div className='dev-name header2'>Michael Gatmaitan</div>
          </div>
        </div>

        <div className='webicons'>
          {webicons.map((webicon, i) => (
            <a href={webicon.link} className='webicon-container' key={i}>
              <webicon.icon className='webicon' />
            </a>
          ))}
        </div>
      </div>

      <form className='send-email-form' onSubmit={handleSendEmail}>
        <div className='field-container'>
          <TextField variant='filled' label='Email' />
          <TextField variant='filled' label='Subject' />
          <TextField
            variant='filled'
            label='Compose a message...'
            multiline
            rows={4}
          />
        </div>

        <Button type='submit' variant='contained'>
          Submit message
        </Button>
      </form>

      <div className='start-creating'>
        <div className='header2'>Start creating projects!</div>

        <Link to='/get-started'>
          <Button variant='contained'>Let's get started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
