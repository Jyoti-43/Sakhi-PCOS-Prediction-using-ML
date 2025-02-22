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
  const [categories, setCategories] = useState([]); // Store symptom categories
  const [symptoms, setSymptoms] = useState([]); // Store symptoms of selected category
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Store selected symptoms
  const [selectedCategory, setSelectedCategory] = useState(null); // Store selected category
  const [showModal, setShowModal] = useState(false);
  const { tokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens.accessToken) {
      navigate("/login");
    }
  }, [tokens.accessToken, navigate]);

  // Fetch categories and symptoms from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://sakhi-backend-tagn.onrender.com/api/user/symptom-categories/"
        );
        setCategories(response.data); // Set categories data from backend
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
          setSymptoms(response.data); // Set symptoms data based on selected category
        } catch (error) {
          console.error("Error fetching symptoms:", error);
        }
      };

      fetchSymptoms();
    }
  }, [selectedCategory]);

  const handleSymptomChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms((prevSelected) => [...prevSelected, value]); // Add selected symptom
    } else {
      setSelectedSymptoms(
        (prevSelected) => prevSelected.filter((symptom) => symptom !== value) // Remove unselected symptom
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const symptomsToSubmit =
      selectedSymptoms.length > 0 ? selectedSymptoms : [];

    try {
      const response = await axios.post(
        "https://sakhi-backend-tagn.onrender.com/api/user/track-symptom/",
        { symptoms: symptomsToSubmit },
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Symptoms submitted successfully:", response.data);
      alert("Symptoms submitted successfully.");
    } catch (error) {
      console.error("Error submitting symptoms:", error);
      alert("Failed to submit symptoms. Please try again.");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update selected category
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
      console.log("Selected Date:", formattedDate);

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
      setPredictedNextPeriod(nextPeriodDate);
      console.log("Predicted Next Period Date:", nextPeriodDate);
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
      return "predicted-period"; // Add CSS class for styling
    }
    return null;
  };

  return (
    <div className="track-period">
      <h1>Period Tracker</h1>
      <p>Please Select Period Start date</p>
      <div>
        <Calendar
          onClickDay={handleDateChange}
          value={period_date}
          minDate={new Date("2020-01-01")}
          maxDate={new Date("2030-12-31")}
          tileClassName={tileClassName}
        />
      </div>

      <div className="symptom-container">
        <button className="add-symptom-btn" onClick={handleClick}>
          Add Symptoms
        </button>
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

              {/* Dropdown to select category */}
              <div className="category-select">
                <label>Select Category</label>
                <select
                  value={selectedCategory}
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

              {/* Symptoms table */}
              <table className="symptoms-table">
                <tbody>
                  {symptoms.map((symptom) => (
                    <tr className="symptom-items" key={symptom.id}>
                      <td>{symptom.name}</td>
                      <td>
                        <input
                          className="symptom-checkbox"
                          type="checkbox"
                          value={symptom.name}
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


// import "./trackperiod.css";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import moment from "moment";
// import CustomCalendar from "./Calender";
// import SymptomSelection from "./Symptoms";
// import { useAuth } from "../ContextHook/AuthProvider";

// const TrackPeriod = () => {
//   const [periodStart, setPeriodStart] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const navigate = useNavigate();
//   const tokens = useAuth();

//   useEffect(() => {
//     if (tokens === undefined) return;

//     if (!tokens?.accessToken) {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [tokens, navigate]);

//   const handleDateClick = (date) => {
//     const formattedDate = date.format("YYYY-MM-DD");
//     setSelectedDate(formattedDate);

//     if (date.isBefore(moment(), "day") || date.isSame(moment(), "day")) {
//       setPeriodStart(formattedDate);
//     } else {
//       setPeriodStart(null);
//     }
//   };

//   const sendPeriodStartToBackend = async (date) => {
//     try {
//       const accessToken = tokens.accessToken;
//       if (!accessToken) {
//         console.log("No token found. Please login again.");
//         return;
//       }

//       const response = await axios.post(
//         "https://sakhi-backend-tagn.onrender.com/api/user/track-period-start/",
//         { period_start_date: date },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         console.log("Period start date sent successfully:", response.data);
//       }
//     } catch (error) {
//       console.error("Error sending period start date:", error);
//     }
//   };

//   const handlePeriodStartChange = (event) => {
//     if (event.target.checked && selectedDate) {
//       sendPeriodStartToBackend(selectedDate);
//     }
//   };

//   return (
//     <div className="period-container">
//       <div className="track-content">
//         <div className="row track-section">
//           <div className="track-period">
//             <div className="col-lg-6">
//               <p>Select period start date:</p>
//               {/* <CustomCalendar
//                 tokens={tokens} // Pass entire tokens object
//                 periodStart={periodStart}
//                 selectedDate={selectedDate}
//                 handleDateClick={handleDateClick}
//                 handlePeriodStartChange={handlePeriodStartChange}
//               /> */}
//             </div>
//             <div className="col-lg-6">
//               <p>Add Symptoms</p>
//               <SymptomSelection />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackPeriod;
