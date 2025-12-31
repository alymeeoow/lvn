import React from "react";
import "../../../assets/styles/comingSoon.css";
import Lvn from "../../../assets/images/logo/lvn-no-no-pilit.png";

const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <div className="coming-soon-card">
        <img src={Lvn} alt="LVN Logo" className="coming-soon-logo" />

        <h1 className="coming-soon-title">
          <span className="title-animated">Coming Soon</span>
        </h1>

        <p className="coming-soon-subtitle">
          Personalized care, delivered to your door.
          <br />
          Our platform is launching shortly.
        </p>

        <div className="coming-soon-divider" />

       
      </div>
    </div>
  );
};

export default ComingSoon;
