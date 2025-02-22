import axios from "axios";
import React, { useState, useEffect } from "react";
import "./advancedsymptoms.css";
import { useAuth } from "../ContextHook/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { set } from "react-datepicker/dist/date_utils";

const AdvancedSymptoms = () => {
  const { tokens } = useAuth();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [probability, setProbability] = useState(null);
  const [input, setInput] = useState({
    skin_darkening: "",
    hair_growth: "",
    weight_gain: "",
    cycle_length: "",
    fast_food: "",
    pimples: "",
    age: "",
    follicle_no_r: "",
    follicle_no_l: "",
    amh: "",
    cycle_r_i: "",
    prl: "",
    fsh_lh: "",
    bmi: "",
    height: "",
    weight: "",
  });

  {
    /* 1. follicle_no_r (integer): Number of follicles in the right ovary.
2. follicle_no_l (integer): Number of follicles in the left ovary.
7. amh (float): Anti-Müllerian hormone level.
9. cycle_r_i (integer): 0 or 1 (Yes/No)
10. fsh_lh (float): Follicle-stimulating hormone (FSH) to luteinizing hormone (LH) ratio.
11. prl (float): Prolactin level.
*/
  }

  useEffect(() => {
    if (!tokens?.accessToken) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [tokens.accessToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Calculate BMI when height or weight changes
  useEffect(() => {
    if (input.height && input.weight) {
      const heightInFeet = parseFloat(input.height);
      const weightInKg = parseFloat(input.weight);

      if (!isNaN(heightInFeet) && !isNaN(weightInKg) && heightInFeet > 0) {
        const heightInMeters = heightInFeet * 0.3048; // Convert feet to meters
        const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
        setInput((prevInput) => ({
          ...prevInput,
          bmi: calculatedBmi.toFixed(2), // Save the BMI value in the state
        }));
      } else {
        setInput((prevInput) => ({
          ...prevInput,
          bmi: "", // Reset BMI if input is invalid
        }));
      }
    }
  }, [input.height, input.weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const binaryFields = [
      "skin_darkening",
      "hair_growth",
      "weight_gain",
      "pimples",
      "cycle_r_i",
      "fast_food",
    ];
    for (let field of binaryFields) {
      if (![0, 1].includes(parseInt(input[field]))) {
        alert(`Please enter '0' or '1' for ${field}.`);
        return;
      }
    }

    if (!input.cycle_length || parseInt(input.cycle_length) <= 0) {
      alert("Please enter a valid cycle length.");
      return;
    }

    // if (parseFloat(input.fast_food) < 0 || parseFloat(input.fast_food) > 1) {
    //   alert("Please enter a valid value for fast food consumption between 0 and 1.");
    //   return;
    // }

    if (!input.age || parseInt(input.age) <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    const { height, weight, ...filteredInput } = input;
    const dataToSend = { ...filteredInput }; // Send all fields except height and weight
    console.log("Data to send:", dataToSend);
    console.log("All input:", input);
    try {
      const token = tokens.accessToken;
      if (!token) {
        console.log("No token found. Please login again.");
        return;
      }

      const response = await axios.post(
        "https://sakhi-backend-tagn.onrender.com/api/user/advanced/",
        dataToSend, // Include the bmi in the payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );
      if (response && response.data) {
        console.log("Prediction Result:", response.data.prediction); // Log the prediction result
        setPrediction(response.data.prediction);
        setProbability(response.data.probability.toFixed(3));
        setShowModal(true);
        // alert(`Prediction result: ${response.data.prediction}`);
        setInput({
          skin_darkening: "",
          hair_growth: "",
          weight_gain: "",
          cycle_length: "",
          fast_food: "",
          pimples: "",
          age: "",
          follicle_no_r: "",
          follicle_no_l: "",
          amh: "",
          cycle_r_i: "",
          prl: "",
          fsh_lh: "",
          bmi: "",
          height: "",
          weight: "",
        }); // Clear the input fields after successful submission
      } else {
        console.error("Prediction result not found in the response.");
      }

      console.log("Data sent successfully", response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error:", error.message);
      }
    }
  };

  return (
    <div className="clinical-section">
      <div className="clinical-symptoms-container">
        <h2>Enter Your Health Data</h2>
        <hr />

        <form onSubmit={handleSubmit} className="clinical-form">
          <div className="clinical-symptoms">
            {/* first column */}
            <div className="radio-input">
              <div className="skin-hair">
                <label htmlFor="age">Age: </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="age"
                  name="age"
                  value={input.age}
                  placeholder="Enter your age"
                  onChange={handleChange}
                  min="1"
                />

                <label htmlFor="height">Height (in feet): </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="height"
                  name="height"
                  value={input.height}
                  placeholder="Enter height in feet"
                  min="1"
                  step="0.1"
                  onChange={handleChange}
                />

                <label htmlFor="weight">Weight (in kg): </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="weight"
                  name="weight"
                  value={input.weight}
                  placeholder="Enter weight in kg"
                  min="1"
                  step="0.1"
                  onChange={handleChange}
                />

                <label htmlFor="bmi">BMI: </label>
                <input
                  className="clinical-input"
                  type="text"
                  id="bmi"
                  value={input.bmi}
                  readOnly
                  placeholder="BMI will be calculated"
                  disabled
                />

                <label htmlFor="cycle_length">Cycle Length: </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="cycle_length"
                  name="cycle_length"
                  value={input.cycle_length}
                  onChange={handleChange}
                  placeholder="Enter your period cycle length"
                />

                <label htmlFor="skin_darkening">Skin Darkening: </label>
                <div className="radio-btn">
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="skin_darkening"
                    value="1"
                    checked={input.skin_darkening === "1"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="skin_darkening"
                    value="0"
                    checked={input.skin_darkening === "0"}
                    onChange={handleChange}
                  />{" "}
                  No
                </div>

                <label htmlFor="hair_growth">Hair Growth: </label>
                <div className="radio-btn">
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="hair_growth"
                    value="1"
                    checked={input.hair_growth === "1"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="hair_growth"
                    value="0"
                    checked={input.hair_growth === "0"}
                    onChange={handleChange}
                  />{" "}
                  No
                </div>
                <label htmlFor="fast_food">Fast Food Consumption: </label>
                <div className="radio-btn">
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    id="fast_food"
                    name="fast_food"
                    value="1"
                    checked={input.fast_food === "1"}
                    onChange={handleChange}
                  />
                  yes
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    id="fast_food"
                    name="fast_food"
                    value="0"
                    checked={input.fast_food === "0"}
                    onChange={handleChange}
                  />
                  No
                </div>
              </div>

              {/* second row */}

              <div className="weight-pimple">
                <label htmlFor="follicle-no-right">
                  Follicle Number Right:{" "}
                </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="follicle-no-r"
                  name="follicle_no_r"
                  value={input.follicle_no_r}
                  onChange={handleChange}
                  placeholder=" Number of follicles in the right ovary."
                />

                <label htmlFor="follicle-no-left">Follicle Number Left: </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="follicle-no-l"
                  name="follicle_no_l"
                  value={input.follicle_no_l}
                  onChange={handleChange}
                  placeholder=" Number of follicles in the left ovary"
                />

                <label htmlFor="amh">Anti-Müllerian hormone: </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="amh"
                  name="amh"
                  value={input.amh}
                  onChange={handleChange}
                  placeholder="Enter Anti-Müllerian hormone level"
                  step="0.1"
                  min="0.1"
                />
                <label htmlFor="fsh_lh">FSH_LH: </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="fsh_lh"
                  name="fsh_lh"
                  value={input.fsh_lh}
                  onChange={handleChange}
                  placeholder="Enter Follicle-stimulating hormone (FSH) to luteinizing hormone (LH) ratio."
                  step="0.1"
                  min="0.1"
                />

                <label htmlFor="prl">Prolactin level: </label>
                <input
                  className="clinical-input"
                  type="number"
                  id="prl"
                  name="prl"
                  value={input.prl}
                  onChange={handleChange}
                  placeholder="Enter Prolactin level"
                  step="0.1"
                  min="0.1"
                />
                <label htmlFor="weight_gain">Weight Gain: </label>
                <div className="radio-btn">
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="weight_gain"
                    value="1"
                    checked={input.weight_gain === "1"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="weight_gain"
                    value="0"
                    checked={input.weight_gain === "0"}
                    onChange={handleChange}
                  />{" "}
                  No
                </div>

                <label htmlFor="pimples">Pimples: </label>
                <div className="radio-btn">
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="pimples"
                    value="1"
                    checked={input.pimples === "1"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="pimples"
                    value="0"
                    checked={input.pimples === "0"}
                    onChange={handleChange}
                  />{" "}
                  No
                </div>

                <label htmlFor="cycle_r_i">Cycle Regular: </label>
                <div className="radio-btn">
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="cycle_r_i"
                    value="1"
                    checked={input.cycle_r_i === "1"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                  <input
                    className="clinical-input-radio"
                    type="radio"
                    name="cycle_r_i"
                    value="0"
                    checked={input.cycle_r_i === "0"}
                    onChange={handleChange}
                  />{" "}
                  No
                </div>
              </div>
            </div>

            <div className="clinical-btn">
              <button type="submit" className="symptom-btn">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="modal-container">
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Prediction Result</h2>
              <hr />
              <h4>
                {" "}
                <strong> {prediction}</strong>
              </h4>
              <h3> with probability:</h3>
              <div className="circular-progress-container">
                <div className="circular-progress-rotated">
                  <CircularProgressbar
                    value={probability * 100} // Convert to percentage
                    text={`${(probability * 100).toFixed(1)}%`}
                    styles={buildStyles({
                      textColor: "#000",
                      pathColor:
                        probability <= 0.5
                          ? "#4CAF50" // Green
                          : probability <= 0.75
                          ? "#FFC107" // Yellow-Orange
                          : "#FF5722", // Red
                      trailColor: "#eee",
                      textSize: "16px",
                      rotation: 0.75 - probability * 0.5, // Makes it a semi-circle
                      strokeLinecap: "round",
                    })}
                  />
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSymptoms;
