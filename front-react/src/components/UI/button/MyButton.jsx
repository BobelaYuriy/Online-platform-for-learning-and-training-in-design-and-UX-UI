import React from "react";
import classes from "./myButton.module.css";
export const MyButton = ({ children, ...props }) => {
  return (
    <div>
      <button {...props} className={classes.mybutton} type="submit">
        {children}
      </button>
    </div>
  );
};
