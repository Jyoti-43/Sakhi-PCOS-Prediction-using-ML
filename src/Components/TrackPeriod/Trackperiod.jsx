import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./trackperiod.css";
import { useAuth } from "../ContextHook/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleView = () => {
  const [period_date, setSelectedDate] = useState(new Date());
  const [predictedNextPeriod, setPredictedNextPeriod] = useState(null);
  const [categories, setCategories] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSymptomsNames, setSelectedSymptomsNames] = useState([]);
  // const [selectedSymptomsByCategory, setSelectedSymptomsByCategory] = useState({});

  const { tokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens.accessToken) {
      navigate("/login");
    }
  }, [tokens.accessToken, navigate]);

  // Fetch categories from backend

  useEffect(() => {
    const storedLastPeriod = localStorage.getItem("lastPeriodDate");
    const storedPredictedPeriod = localStorage.getItem("predictedPeriodDate");

    if (storedLastPeriod) {
      setSelectedDate(new Date(storedLastPeriod));
    }

    if (storedPredictedPeriod) {
      setPredictedNextPeriod(new Date(storedPredictedPeriod));
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://sakhi-backend-tagn.onrender.com/api/user/symptom-categories/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      const fetchSymptoms = async () => {
        try {
          const response = await axios.get(
            `https://sakhi-backend-tagn.onrender.com/api/user/symptoms/${selectedCategory}/`
          );
          setSymptoms(response.data);
        } catch (error) {
          console.error("Error fetching  selected symptoms:", error);
        }
      };

      fetchSymptoms();
    }
  }, [selectedCategory]);

  const handleSymptomChange = (event) => {
    const { value, checked } = event.target;
    const symptomId = parseInt(value, 10); // Convert value to number

    setSelectedSymptoms((prevSelected) => {
      let updatedSymptoms = [...prevSelected]; // Clone the previous state to avoid direct mutation

      if (checked) {
        // Add the selected symptom ID to the list if it's not already there
        if (!updatedSymptoms.includes(symptomId)) {
          updatedSymptoms.push(symptomId);
        }
      } else {
        // Remove the deselected symptom ID from the list
        updatedSymptoms = updatedSymptoms.filter((id) => id !== symptomId);
      }

      return updatedSymptoms;
    });
  };

  // const handleSymptomChange = (event) => {
  //   const { value, checked } = event.target;
  //   setSelectedSymptoms((prevSelected) =>
  //     checked
  //       ? [...prevSelected, value]
  //       : prevSelected.filter((symptom) => symptom !== value)
  //   );
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!period_date) {
      console.error("Error: Period date is missing.");
      return;
    }

    if (!symptoms || symptoms.length === 0) {
      console.error("Error: No symptoms selected.");
      return;
    }

    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom before submitting.");
      return;
    }

    const requestData = {
      period_date: new Date(period_date).toISOString().split("T")[0], // Converts to 'YYYY-MM-DD'
      symptoms: selectedSymptoms,
      // symptoms: selectedSymptoms.id, // Ensure this is an array of strings
    };

    console.log("Selected data:", requestData);

    try {
      const response = await axios.post(
        "https://sakhi-backend-tagn.onrender.com/api/user/track-symptom/",

        requestData,
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update the symptoms state with names for display purposes
      const symptomNames = symptoms
        .filter((symptom) => selectedSymptoms.includes(symptom.id))
        .map((symptom) => symptom.name);

      // Store selected symptoms' names in a new state to display
      setSelectedSymptomsNames(symptomNames);

      console.log("Symptoms name:", symptomNames);

      console.log("Symptoms submitted successfully:", response.data);
      alert("Symptoms submitted successfully.");
      setSelectedSymptoms([]);
      setShowModal(false);
    } catch (error) {
      if (error.response) {
        // Server responded with a non-2xx status
        console.error("Error submitting symptoms:", error.response.data);
        // alert(`Failed to submit symptoms: ${error.response.data}`);
      } else if (error.request) {
        // No response received from server
        console.error("No response from server:", error.request);
        alert("No response from server. Please try again.");
      } else {
        // Some other error occurred
        console.error("Error setting up request:", error.message);
        alert("Error while setting up the request. Please try again.");
      }
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleDateChange = async (date) => {
    try {
      setSelectedDate(date);

      const accessToken = tokens?.accessToken;
      if (!accessToken) {
        alert("Authentication error. Please log in again.");
        return;
      }

      const formattedDate = date.toISOString().split("T")[0];
      localStorage.setItem("lastPeriodDate", formattedDate);
      const response = await axios.post(
        "https://sakhi-backend-tagn.onrender.com/api/user/track-period/",
        { period_date: formattedDate },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // if (response.data?.predicted_period) {
      //   const predictedDate = response.data.predicted_period;
      //   localStorage.setItem("predictedPeriodDate", predictedDate);
      //   setPredictedNextPeriod(new Date(predictedDate));
      // }
      console.log("Period tracked successfully!", response.data);
      fetchPredictedPeriod(date);
    } catch (error) {
      console.error(
        "Error tracking period:",
        error.response?.data || error.message
      );
      alert("Unable to track period. Please try again.");
    }
  };

  const fetchPredictedPeriod = async (periodStartDate) => {
    try {
      if (!periodStartDate) return;
      const nextPeriodDate = new Date(periodStartDate);
      nextPeriodDate.setDate(nextPeriodDate.getDate() + 28);

      localStorage.setItem("predictedPeriodDate", nextPeriodDate.toISOString());

      setPredictedNextPeriod(nextPeriodDate);
    } catch (error) {
      console.error("Error predicting next period:", error.message);
      alert("Unable to predict the next period. Please try again.");
    }
  };

  const tileClassName = ({ date }) => {
    if (
      predictedNextPeriod &&
      date.toDateString() === predictedNextPeriod.toDateString()
    ) {
      return "highlighted-predicted-date";
    }
    return null;
  };

  return (
    <div className="track-period">
      <h1>Period Tracker</h1>
      <p>Please Select Period Start date</p>
      <div className="calendar-symptoms">
        <Calendar
          onClickDay={handleDateChange}
          value={period_date}
          minDate={new Date("2020-01-01")}
          maxDate={new Date("2030-12-31")}
          tileClassName={tileClassName}
        />
        <div className="selected-symptoms">
          <h3>
            {" "}
            <strong>Selected Symptoms:</strong>{" "}
          </h3>
          {selectedSymptomsNames.length > 0 ? (
            <ul>
              {selectedSymptomsNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          ) : (
            <p>No symptoms selected yet.</p>
          )}
        </div>
      </div>
      <div className="pridction-btn">
        {predictedNextPeriod && (
          <div className="predicted-date">
            <h2>Predicted Period Date:</h2>
            <p>{predictedNextPeriod.toLocaleDateString()}</p>
          </div>
        )}

        <div className="symptom-container">
          <button className="add-symptom-btn" onClick={handleClick}>
            Add Symptoms
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal modal-symptoms">
          <div className="modal-content modal-content-symptoms">
            <form onSubmit={handleSubmit} className="symptoms-form">
              <div className="form-header">
                <h2>Choose Symptoms</h2>
                <button
                  className="close"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <hr />

              <div className="category-select">
                <label>Select Category</label>
                <select
                  value={selectedCategory || ""}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">--Select Category--</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <table className="symptoms-table">
                <tbody>
                  {symptoms.map((symptom) => (
                    <tr className="symptom-items" key={symptom.id}>
                      <td>{symptom.name}</td>

                      <td>
                        <input
                          className="symptom-checkbox"
                          type="checkbox"
                          value={symptom.id}
                          onChange={handleSymptomChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="submit" className="submit-button">
                Submit Symptoms
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
