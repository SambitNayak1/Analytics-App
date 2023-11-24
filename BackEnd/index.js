const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

const logger = require("./logger");

app.get("/", (req, res) => {
  res.send("Hello from sambit");
});

app.post("/api/saveMeetingData", (req, res) => {
  const saveMeetingData = req.body;
  // console.log("Meeting data received:", saveMeetingData);
  logger.info(saveMeetingData);
  res.json({ message: "Meeting data received successfully" });
});

//New endpoint for handling Updated Data
app.post("/api/sendUpdateData", (req, res) => {
  const updatedData = req.body;
  //  console.log('Updated data received:', updatedData);
  logger.info(JSON.stringify(updatedData));
  res.json({ message: "Updated data received successfully" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error while running on port", err);
  } else {
    console.log("App is up and running on port:", PORT);
  }
});
