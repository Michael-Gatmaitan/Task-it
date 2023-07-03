import React from "react";
import { Skeleton } from "@mui/material";
import "./Skeletons.css";

// The custom skeletons aree responsive bc of it's own css styles

interface SkeletonComponentName {
  componentName: "nav" | "sidebar" | "project-card" | "board-card" | "card";
}

const CustomStyledSkeleton: React.FC<SkeletonComponentName> = (props) => {
  const { componentName } = props;

  return (
    <Skeleton
      className={`custom-skeleton skeleton-${componentName}`}
      variant='rounded'
    />
  );
};

export default CustomStyledSkeleton;
