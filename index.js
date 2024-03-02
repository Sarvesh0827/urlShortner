// app.js

const express = require("express");
const app = express();
const PORT = 8001;
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

// Middleware to parse JSON request bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Route for handling URL operations
app.use("/", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp:Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// const express = require('express');
// const app = express();
// const PORT = 8001;
// const { connectToMongoDB } = require('./connect');

// const urlRoute = require('./routes/url');

// connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
//     .then(() => {
//         console.log("MongoDB Connected");
//     })
//     .catch(err => {
//         console.error("Error connecting to MongoDB:", err);
//         process.exit(1); // Exit the process if unable to connect to MongoDB
//     });

// app.use('/', urlRoute);
// // app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // Middleware to parse JSON bodies

// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });
