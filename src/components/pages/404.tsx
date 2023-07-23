import React from "react";
import { titleChanger } from "../../app/titleChanger";

const Page404: React.FC = () => {
  titleChanger({ title: "Page not found." });

  return (
    <div className='404 page'>
      <h1>Page not found</h1>
    </div>
  );
};

export default Page404;
