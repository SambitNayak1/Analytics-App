const express = require('express');
const axios = require('axios');

const router = express.Router();

// Replace 'YOUR_LOKI_DATASOURCE_UID' with the actual UID of your Loki data source
const lokiDatasourceUid = 'c8a40b25-652e-4873-908a-98b96971975d';
const authorizationToken = 'glsa_7yn48Hc6E6h1zQnMPFBNJqdiMV8RmgCk_7717b29d'; // Replace with your actual token

router.get('/createMeeting/logs', async (req, res) => {
  try {
    // Check for the presence of the authorization token in the request headers
    const token = req.headers.authorization;

    if (!token || token !== `Bearer ${authorizationToken}`) {
      console.log('Unauthorized request');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Build a Loki query to show all logs with a specific service and timestamp range
    const lokiQuery = '{filename="/var/log/saveMeetinglog.log"}';

    // Calculate the time range for the query (adjust as needed)
    const endTime = new Date().toISOString(); // To now
    const startTime = new Date(Date.now() - 24 * 3600 * 1000).toISOString(); // 24 hours ago

    console.log('Loki Query:', lokiQuery);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);

    // Make a request to Loki to fetch all logs
    const response = await axios.get(`http://174.138.122.222:3100/loki/api/v1/query_range`, {
        params: {
          query: lokiQuery,
          start: startTime,
          end: endTime,
          limit: 100,
          direction: 'forward',
        },
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      

    /* console.log('Loki Response:', response.data);

    // Return the logs in the response
    res.json(response.data); */

     // Extract only the 'values' array section from the response which contains all the event log data
     const values = response.data.data.result[0]?.values || [];

     // Return only the 'values' in the response
     res.json({ values });

  } catch (error) {
    console.error('Error in logs.js:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/updateMeeting/logs', async (req, res) => {
    try {
      // Check for the presence of the authorization token in the request headers
      const token = req.headers.authorization;
  
      if (!token || token !== `Bearer ${authorizationToken}`) {
        console.log('Unauthorized request');
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      
      // Build a Loki query to show all logs with a specific service and timestamp range
      const lokiQuery = '{filename="/var/log/sendUpdateData.log"}';
  
      // Calculate the time range for the query (adjust as needed)
      const endTime = new Date().toISOString(); // To now
      const startTime = new Date(Date.now() - 24 * 3600 * 1000).toISOString(); // 24 hours ago
  
      console.log('Loki Query:', lokiQuery);
      console.log('Start Time:', startTime);
      console.log('End Time:', endTime);
  
      // Make a request to Loki to fetch all logs
      const response = await axios.get(`http://174.138.122.222:3100/loki/api/v1/query_range`, {
          params: {
            query: lokiQuery,
            start: startTime,
            end: endTime,
            limit: 100,
            direction: 'forward',
          },
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        
  
      /* console.log('Loki Response:', response.data);
  
      // Return the logs in the response
      res.json(response.data); */
  
       // Extract only the 'values' array section from the response which contains all the event log data
       const values = response.data.data.result[0]?.values || [];
  
       // Return only the 'values' in the response
       res.json({ values });
  
    } catch (error) {
      console.error('Error in logs.js:', error);
      res.status(500).send('Internal Server Error');
    }
  });



module.exports = router;
