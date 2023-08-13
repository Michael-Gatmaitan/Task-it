// import { Skeleton } from "@mui/material";
import "./LoadingComponent.css";

interface LCPartialProps {
  loadingMessage?: string;
}

const LoadingComponent = (props: LCPartialProps) => {
  return (
    <div className='page loading-component'>
      {/* <Skeleton variant='rounded' width='50' height='100vh' animation='pulse' /> */}
      <div className='bar-container'>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>

      {props.loadingMessage ? <div>{props.loadingMessage}</div> : null}
    </div>
  );
};

export default LoadingComponent;
