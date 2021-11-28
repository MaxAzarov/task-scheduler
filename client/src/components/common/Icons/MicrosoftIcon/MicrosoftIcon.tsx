import React from "react";
import "./MicrosoftIcon.scss";

interface Props {
  classes?: string;
}

const MicrosoftIcon = ({ classes }: Props) => {
  return (
    <iframe
      frameBorder="no"
      title="Inline Frame Example"
      src="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
      className={`microsoft-icon ${classes}`}
    />
  );
};

export default MicrosoftIcon;
