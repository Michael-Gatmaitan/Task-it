import { Skeleton } from "@mui/material";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className='page loading-component'>
      <Skeleton variant='rectangular' width='50' height='50' />
      Loading component
    </div>
  );
};

export default LoadingComponent;
