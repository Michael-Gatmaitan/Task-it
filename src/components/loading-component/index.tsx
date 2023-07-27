// import { Skeleton } from "@mui/material";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className='page loading-component'>
      {/* <Skeleton variant='rounded' width='50' height='100vh' animation='pulse' /> */}
      <div className='bar-container'>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
