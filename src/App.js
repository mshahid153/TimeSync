import React, { useState, useEffect } from "react";
import "./App.css";
import TimezoneSlider from "./components/TimezoneSlider";
import DatePicker from "./components/DatePicker";

const AVAILABLE_REGIONS = [
  { label: "UTC", offset: 0 },
  { label: "PST", offset: -480 },
  { label: "EST", offset: -300 },
  { label: "CST", offset: -360 },
  { label: "MST", offset: -420 },
  { label: "IST", offset: 330 },
  { label: "CET", offset: 60 },
];

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRegions, setSelectedRegions] = useState(["UTC", "IST"]);
  const [regionTimes, setRegionTimes] = useState({ UTC: 0, IST: 330 });
  const [newRegion, setNewRegion] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    initializeTimes();
  }, []);

  const initializeTimes = () => {
    const utcMinutes =
      new Date().getUTCHours() * 60 + new Date().getUTCMinutes();
    setRegionTimes({
      UTC: utcMinutes,
      IST: utcMinutes + 330,
    });
  };

  const onDateChange = (date) => setCurrentDate(date);

  const onRegionTimeChange = (timeInMinutes) => {
    setRegionTimes((prevTimes) => {
      const updatedTimes = {};
      for (const region of selectedRegions) {
        const offset = AVAILABLE_REGIONS.find((r) => r.label === region).offset;
        updatedTimes[region] = (timeInMinutes + offset + 1440) % 1440;
      }
      return updatedTimes;
    });
  };

  const addRegion = () => {
    if (newRegion && !selectedRegions.includes(newRegion)) {
      const regionData = AVAILABLE_REGIONS.find((r) => r.label === newRegion);
      if (regionData) {
        setSelectedRegions((prevRegions) => [...prevRegions, newRegion]);
        setRegionTimes((prevTimes) => ({
          ...prevTimes,
          [newRegion]: regionTimes.UTC + regionData.offset,
        }));
        setNewRegion("");
      }
    }
  };

  const removeRegion = (region) => {
    if (region !== "UTC") {
      setSelectedRegions((prevRegions) =>
        prevRegions.filter((r) => r !== region)
      );
      setRegionTimes((prevTimes) => {
        const updatedTimes = { ...prevTimes };
        delete updatedTimes[region];
        return updatedTimes;
      });
    }
  };

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="app-card">
        <header className="app-header">
          <h1>TimeSync</h1>
          <button onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>
        <div className="timezone-controls">
          <DatePicker currentDate={currentDate} onDateChange={onDateChange} />
          <div className="timezone-button">
            <button onClick={() => alert("Time information shared!")}>
              Share Time Information
            </button>
            <button onClick={() => alert("Meeting scheduled!")}>
              Schedule Meeting
            </button>
          </div>
        </div>
        <div className="add-region">
          <select
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
          >
            <option value="" disabled>
              Select a region
            </option>
            {AVAILABLE_REGIONS.map((region) => (
              <option key={region.label} value={region.label}>
                {region.label}
              </option>
            ))}
          </select>
          <button onClick={addRegion}>Add Region</button>
        </div>
        <div className="timezone-list">
          {selectedRegions.map((region) => (
            <TimezoneSlider
              key={region}
              region={region}
              timeInMinutes={regionTimes[region]}
              onTimeChange={(time) =>
                onRegionTimeChange(time - regionTimes[region] + regionTimes.UTC)
              }
              removeRegion={removeRegion}
              chosenDate={currentDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
