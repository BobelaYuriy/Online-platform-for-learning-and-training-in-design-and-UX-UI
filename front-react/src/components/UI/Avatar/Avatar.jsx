import React from "react";
import "./Avatar.css";

const Avatar = ({ userData, size }) => {
  // Перевіряємо, чи є у користувача аватар, якщо немає, використовуємо user.png
  const avatarSrc = userData?.avatar ? userData.avatar : "/user.jpg";

  return (
    <div className="avatar-container">
      <div className={`avatar ${size}`}>
        <img src={avatarSrc} alt="avatar" />
      </div>
    </div>
  );
};
export default Avatar;
