import React from "react";
import "./index.css";

function TimezoneSlider({ region, timeInMinutes, onTimeChange, removeRegion }) {
  let hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  // Convert to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert '0' hour to '12'

  const handleSliderChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    // Loop the slider when it reaches the end
    if (newValue < 0) newValue += 1440;
    if (newValue >= 1440) newValue -= 1440;
    onTimeChange(newValue);
  };

  return (
    <div className="timezone-slider">
      <div className="top">
        <label>{region}</label>
        {region !== "UTC" && (
          <button onClick={() => removeRegion(region)}>Remove</button>
        )}
      </div>
      <input
        type="range"
        min="0"
        max="1440"
        value={timeInMinutes}
        onChange={handleSliderChange}
      />
      <span className="time-display">{`${hours
        .toString()
        .padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`}</span>
    </div>
  );
}

export default TimezoneSlider;
