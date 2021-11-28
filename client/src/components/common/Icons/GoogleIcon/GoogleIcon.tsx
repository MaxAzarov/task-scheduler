import React from "react";
import "./GoogleIcon.scss";

interface Props {
  classes?: string;
}

const GoogleIcon = ({ classes }: Props) => {
  return (
    <img
      className={`google-icon ${classes}`}
      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      alt="google"
    />
  );
};

export default GoogleIcon;
