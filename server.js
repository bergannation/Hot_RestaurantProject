// Dependencies

const express = require("express");
const path = require("path");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
const tables = [];
const waitingList = [];

// Routes
const router = express.Router();
// Basic route that sends the user first to the AJAX Page

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "home.html")));
//
router.get("/tables", (req, res) =>
  res.sendFile(path.join(__dirname, "tables.html"))
);

router.get("/reserve", (req, res) =>
  res.sendFile(path.join(__dirname, "reserve.html"))
);

// Display
router.get("/api/tables", (req, res) => res.json(tables));
router.get("/api/waitlist", (req, res) => res.json(waitingList));

app.use(router);
// Create New Characters - takes in JSON input
app.post("/api/tables", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  console.log(newReservation);

  tables.push(newReservation);
  var isBooked;
  if (tables.length <= 5) {
    isBooked = true;
  } else {
    isBooked = false;
  }
  res.json(isBooked);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
