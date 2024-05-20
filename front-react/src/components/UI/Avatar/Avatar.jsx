import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Avatar.css";

const Avatar = ({ userData, size, onAvatarChange }) => {
  const avatarSrc = userData?.avatar ? userData.avatar : "/user.jpg";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="avatar-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`avatar ${size}`}>
        <img src={avatarSrc} alt="avatar" />
        {isHovered && onAvatarChange && (
          <div className="overlay">
            <Form.Label className="choose-avatar-label">
              Choose Avatar
              <Form.Control
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                style={{ display: "none" }}
              />
            </Form.Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
