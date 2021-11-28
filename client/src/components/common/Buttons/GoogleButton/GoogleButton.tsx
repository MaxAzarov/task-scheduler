import React from "react";
import "./GoogleButton.scss";
import { Button } from "antd";
import GoogleIcon from "../../Icons/GoogleIcon/GoogleIcon";

const GoogleButton = () => {
  return (
    <Button
      className="google-btn"
      onClick={() =>
        (window.location.href = "http://localhost:5000/google/signin")
      }
    >
      <GoogleIcon classes="google-margin-right" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
