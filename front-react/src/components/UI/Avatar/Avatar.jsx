import React from "react";
import "./Avatar.css";
const Avatar = ({ imageSrc, size }) => {
  return (
    <div className="avatar-container">
      <div className={`avatar ${size}`}>
        <img src={imageSrc} alt="avatar" />
      </div>
    </div>
  );
};

export default Avatar;
