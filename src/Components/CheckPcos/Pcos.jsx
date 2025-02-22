import React, { useState } from "react";
import AboutUs from "../About/AboutUs";

import "./pcos.css";
import ClinicalSymptoms from "./ClinicalSymptoms";
import AdvancedSymptoms from "./AdvancedSymptoms";

const Pcos = () => {
  const mealImg = "/assets/img/meal-img.png";
  const [toggleState, setToggleState] = useState(1);

  // Style for the background image of the header
  const style = {
    backgroundImage: `url(${mealImg})`,
    backgroundSize: "cover",
    height: "175px",
    width: "100%",
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <header id="tab-header" className="tab-header" >
        <div className="tab-header-text">
          <h2 class="typing-text">"Choose how you’d like to proceed: <br /> 
          Predict using Non-Clinical Data or Advanced Data"</h2>
        </div>
        <nav className="tabbar">
          <ul>
            <li className="tab-item">
              <button
                className={
                  toggleState === 1
                    ? "tabs active-tabs tab-link"
                    : "tabs tab-link"
                }
                onClick={() => toggleTab(1)}
              >
                Non-Clinical Data
              </button>
            </li>
            <li className="tab-item">
              <button
                className={
                  toggleState === 2
                    ? "tabs active-tabs tab-link"
                    : "tabs tab-link"
                }
                onClick={() => toggleTab(2)}
              >
                Advanced Data
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container-tabs">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <ClinicalSymptoms />
        </div>
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <AdvancedSymptoms />
        </div>
      </div>
    </div>
  );
};

export default Pcos;
