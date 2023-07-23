import React from "react";
import { titleChanger } from "../../app/titleChanger";

const About: React.FC = () => {
  titleChanger({ title: "About" });
  return <div className='about page'>About</div>;
};

export default About;
