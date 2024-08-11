import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

function DatePicker({ currentDate, onDateChange }) {
  return (
    <div className="date-picker">
      <ReactDatePicker selected={currentDate} onChange={onDateChange} />
    </div>
  );
}

export default DatePicker;
