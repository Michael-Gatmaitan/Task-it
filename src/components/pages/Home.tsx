import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFirstName, setLastName } from "../../slices/userSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const fName = useAppSelector((state) => state.userReducer.firstName);

  const lName = useAppSelector((state) => state.userReducer.lastName);

  return (
    <div className='home page'>
      Home page
      <h1>
        {fName} {lName}
      </h1>
      <input
        type='text'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setFirstName(e.target.value))
        }
      />
      <input
        type='text'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setLastName(e.target.value))
        }
      />
    </div>
  );
};

export default Home;
