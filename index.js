// app.js

const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth} =require('./middlewares/auth')
const PORT = 8001;
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const path = require('path');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.set("view engine", "ejs");
app.set('views',path.resolve('./views'));



// Route for handling URL operations
app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use('/user', userRoute);
app.use('/',checkAuth ,staticRouter);




app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      // Handle the case where no entry was found
      return res.status(404).send("Short URL not found.");
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error finding or updating URL:", error);
    res.status(500).send("Internal server error");
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

