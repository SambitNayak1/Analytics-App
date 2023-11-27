import React, { useState } from "react";

const SummaryComponent = ({
  userName,
  date,
  hour,
  minute,
  ampm,
  durationHour,
  durationMinute,
  selectedExperience,
  selectedAttendees,
  organization,
  department,
}) => {
  const [updatedValues, setUpdatedValues] = useState({
    userName: "",
    organization: "",
    department: "",
    date: "",
    startTime: "",
    durationTime: "",
    selectedExperience: [],
    selectedAttendees: [],
  });

  const startTime = `${hour}:${minute} ${ampm}`;
  const durationTime = `${durationHour}:${durationMinute}`;

  const handleUpdate = (field) => {
    // If the field is 'selectedExperience', show a dropdown
    if (field === "selectedExperience" || field === "selectedAttendees") {
      const updatedValue = prompt(
        `Enter new ${field}: `,
        updatedValues[field].join(", ")
      );
      if (updatedValue === null) {
        return;
      }

      const updatedArray = updatedValue.split(",").map((item) => item.trim());
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        [field]: updatedArray,
      }));
      console.log(`Updated ${field} to:`, updatedArray);
    } else if (field === "startTime") {
      const updatedValue = prompt(
        `Enter new Date and Time for ${field}: `,
        updatedValues[field]
      );
      if (updatedValue === null) {
        return;
      }

      // Update the state with the new value
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        [field]: updatedValue,
      }));
      console.log(`Updated ${field} to:`, updatedValue);
    } else if (field === "date") {
      // Use an input of type "date" for the 'Date' field
      const updatedValue = prompt(
        `Select new Date for ${field}: `,
        updatedValues[field]
      );
      if (updatedValue === null) {
        return;
      }

      // Update the state with the new value
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        [field]: updatedValue,
      }));
      console.log(`Updated ${field} to:`, updatedValue);
    } else {
      // Prompt the user for the updated value
      const updatedValue = prompt(
        `Enter new value for ${field}`,
        updatedValues[field]
      );
      if (updatedValue === null) {
        return;
      }

      // Update the state with the new value
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        [field]: updatedValue,
      }));
      console.log(`Updated ${field} to:`, updatedValue);
    }
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log("Delete clicked");
  };

  const handleSend = async () => {
    try {
      const sendData = {
        userName: updatedValues.userName || userName,
        organization: updatedValues.organization || organization,
        department: updatedValues.department || department,
        date: updatedValues.date || date,
        startTime: updatedValues.startTime || startTime,
        durationTime: updatedValues.durationTime || durationTime,
        selectedExperience:
          updatedValues.selectedExperience.length > 0
            ? updatedValues.selectedExperience
            : selectedExperience.map((experience) => experience.name),
        selectedAttendees:
          updatedValues.selectedAttendees.length > 0
            ? updatedValues.selectedAttendees
            : selectedAttendees.map((attendee) => attendee.name),
      };
      // Convert jsonSendData to JSON format
      const jsonSendData = JSON.stringify(sendData, null, 2);

      // Send the JSON data to the backend
      const response = await fetch("http://localhost:5000/api/sendUpdateData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonSendData,
      });

      if (!response.ok) {
        throw new Error("Failed to send updated data");
      }

      // Parse the response JSON
      const responseData = await response.json();

      // Log the server response
      console.log("Server response:", responseData);

      // Additional handling if needed
    } catch (error) {
      console.error("Error sending updated data:", error.message);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div className="summary-container">
      <h3>Summary Report Updatebs</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td>User Name:</td>
            <td>
              {updatedValues.userName !== ""
                ? updatedValues.userName
                : userName}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("userName")}
                style={{ backgroundColor: "springreen" }}
              >
                Update
              </button>
            </td>
           
          </tr>
          <tr>
            <td>Organization:</td>
            <td>
              {updatedValues.organization !== ""
                ? updatedValues.organization
                : organization}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("organization")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
           
          </tr>

          <tr>
            <td>Department:</td>
            <td>
              {updatedValues.department !== ""
                ? updatedValues.department
                : department}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("department")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
           
          </tr>
          <tr>
            <td>Date:</td>
            <td>{updatedValues.date !== "" ? updatedValues.date : date}</td>
            <td>
              <button
                onClick={() => handleUpdate("date")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
           
          </tr>

          <tr>
            <td>Start Time:</td>
            <td>
              {updatedValues.startTime !== ""
                ? updatedValues.startTime
                : startTime}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("startTime")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
           
          </tr>

          <tr>
            <td>Meeting Duration:</td>
            <td>
              {updatedValues.durationTime !== ""
                ? updatedValues.durationTime
                : durationTime}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("durationTime")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
            
          </tr>

          <tr>
            <td>Selected Experiences:</td>
            <td>
              {updatedValues.selectedExperience.length > 0 ? (
                <div>
                  {updatedValues.selectedExperience.map((experience) => (
                    <div key={experience.id}>
                      <input type="checkbox" defaultChecked />
                      <label>{experience}</label>
                    </div>
                  ))}
                </div>
              ) : (
                // Render the original values if no updates
                <div>
                  {selectedExperience.map((experience) => (
                    <div key={experience.id}>
                      <input type="checkbox" defaultChecked />
                      <label>{experience.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("selectedExperience")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
           
          </tr>

          <tr>
            <td>Selected Attendees:</td>
            <td>
              {updatedValues.selectedAttendees.length > 0 ? (
                <div>
                  {updatedValues.selectedAttendees.map((attendee) => (
                    <div key={attendee.id}>
                      <input type="checkbox" defaultChecked />
                      <label>{attendee}</label>
                    </div>
                  ))}
                </div>
              ) : (
                // Render the original values if no updates
                <div>
                  {selectedAttendees.map((attendee) => (
                    <div key={attendee.id}>
                      <input type="checkbox" defaultChecked />
                      <label>{attendee.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </td>
            <td>
              <button
                onClick={() => handleUpdate("selectedAttendees")}
                style={{ backgroundColor: "seagreen" }}
              >
                Update
              </button>
            </td>
            
          </tr>
        </tbody>
      </table>
      <br />
      <button className="send-button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default SummaryComponent;
