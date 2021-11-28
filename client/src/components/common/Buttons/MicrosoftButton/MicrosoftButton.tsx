import React from "react";
import { Button } from "antd";
import "./MicrosoftButton.scss";
import MicrosoftIcon from "../../Icons/MicrosoftIcon/MicrosoftIcon";

const MicrosoftButton = () => {
  return (
    <Button
      className="microsoft-btn"
      onClick={() =>
        (window.location.href = "http://localhost:5000/microsoft/signin")
      }
    >
      <MicrosoftIcon classes="microsoft--btn-position" />
      Continue with Microsoft
    </Button>
  );
};

export default MicrosoftButton;
