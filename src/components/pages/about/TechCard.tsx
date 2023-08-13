import React from "react";
import { motion } from "framer-motion";
import "../../styles/about/TechCard.css";

interface TechCardProps {
  imgSrc: string;
  techTitle: string;
  techLabel: string;
  techLink: string;
}

const TechCard: React.FC<TechCardProps> = (props: TechCardProps) => {
  const { imgSrc, techTitle, techLabel, techLink } = props;

  return (
    <motion.a
      href={techLink}
      target='_blank'
      className='tech-card bordered-container'
      whileTap={{ scale: 0.9 }}
    >
      <div className='tech-logo-container'>
        <img src={imgSrc} alt={`${techTitle} logo`} className='tech-logo' />
      </div>

      <div className='tech-info'>
        <div className='tech-title header3'>{techTitle}</div>
        <div className='tech-label label'>{techLabel}</div>
      </div>
    </motion.a>
  );
};

export default TechCard;
