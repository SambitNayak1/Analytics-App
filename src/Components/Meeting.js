import React, { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import SummaryComponent from "./SummaryComponent";

const Meeting = () => {
  const initialMeetingData = {
    organization: "",
    department: "",
    project: "",
    userName: "",
    meetingName: "",
    description: "",
    date: "",
    hour: "12",
    minute: "00",
    ampm: "AM",
    durationHour: "1",
    durationMinute: "00",
    selectedExperience: [],
    selectedAttendees: [],
  };

  const [meetingData, setMeetingData] = useState(initialMeetingData);
  const [showSummary, setShowSummary] = useState(false);

  const experiences = [
    { name: "Experience A", id: "A" },
    { name: "Experience B", id: "B" },
    { name: "Experience C", id: "C" },
    { name: "Experience D", id: "D" },
  ];

  const attendees = [
    { name: "Attendee 1", id: "1" },
    { name: "Attendee 2", id: "2" },
    { name: "Attendee 3", id: "3" },
    { name: "Attendee 4", id: "4" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({
      ...meetingData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Convert meetingData to JSON format
      const jsonMeetingData = JSON.stringify(meetingData, null, 2);

      // Send the JSON data to the backend
      const response = await fetch(
        "http://localhost:5000/api/saveMeetingData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonMeetingData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save meeting data");
      }

      // Parse the response JSON
      const responseData = await response.json();

      // Log the server response
      console.log("Server response:", responseData);

      // Set the state to show the summary component
      setShowSummary(true);
    } catch (error) {
      console.error("Error saving meeting data:", error.message);
      // Handle the error, show a message to the user, etc.
    }
  };

  const handleReset = () => {
    setMeetingData(initialMeetingData);
    setShowSummary(false);
  };

  const onSelectExperience = (selectedList, selectedItem) => {
    setMeetingData({
      ...meetingData,
      selectedExperience: selectedList,
    });
  };

  const onSelectAttendees = (selectedList, selectedItem) => {
    setMeetingData({
      ...meetingData,
      selectedAttendees: selectedList,
    });
  };

  return (
    <div className="meeting-wrapper">
      <div className="meeting-container">
        <label>
          Organization:
          <input
            type="text"
            name="organization"
            value={meetingData.organization}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={meetingData.department}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Project:
          <input
            type="text"
            name="project"
            value={meetingData.project}
            onChange={handleInputChange}
          />
        </label>
        <label>
          User Name:
          <input
            type="text"
            name="userName"
            value={meetingData.userName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Meeting Name:
          <input
            type="text"
            name="meetingName"
            value={meetingData.meetingName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={meetingData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={meetingData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="small-label">
          Start Time:
          <input
            type="number"
            name="hour"
            value={meetingData.hour}
            onChange={handleInputChange}
            className="small-input"
          />
          :
          <input
            type="number"
            name="minute"
            value={meetingData.minute}
            onChange={handleInputChange}
            className="small-input"
          />
          <select
            name="ampm"
            value={meetingData.ampm}
            onChange={handleInputChange}
            className="small-input"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
        <label>
          Duration:
          <input
            type="number"
            name="durationHour"
            value={meetingData.durationHour}
            onChange={handleInputChange}
          />
          :
          <input
            type="number"
            name="durationMinute"
            value={meetingData.durationMinute}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Add experiences:
          <Multiselect
            options={experiences}
            onSelect={onSelectExperience}
            onRemove={onSelectExperience}
            displayValue="name"
            placeholder="Select Experiences"
            selectedValues={meetingData.selectedExperience}
          />
        </label>

        <label>
          Add Attendees:
          <Multiselect
            options={attendees}
            onSelect={onSelectAttendees}
            onRemove={onSelectAttendees}
            displayValue="name"
            placeholder="Select Attendees"
            selectedValues={meetingData.selectedAttendees}
          />
        </label>

        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <br />

      {showSummary && (
        <div className="summary-wrapper">
          <SummaryComponent
            userName={meetingData.userName}
            organization={meetingData.organization}
            department={meetingData.department}
            date={meetingData.date}
            hour={meetingData.hour}
            minute={meetingData.minute}
            ampm={meetingData.ampm}
            durationHour={meetingData.durationHour}
            durationMinute={meetingData.durationMinute}
            selectedExperience={meetingData.selectedExperience}
            selectedAttendees={meetingData.selectedAttendees}
          />
        </div>
      )}
    </div>
  );
};

export default Meeting;
