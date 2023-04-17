const express = require("express");
const app = express();
const DB = require("./database.js");

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

// Login
apiRouter.post("/login", async (req, res) => {
  const status = await DB.login(req.body.username);
  res.sendStatus(status);
});

// Get Previous workout Data
apiRouter.post("/prev-workouts", async (req, res) => {
  const response = await DB.prev_workouts(
    req.body.selected_workout,
    req.body.username
  );
  res.send(response);
});

// Get Todays workout
apiRouter.post("/today-workouts", async (req, res) => {
  const response = await DB.todays_workout(
    req.body.selected_workout,
    req.body.username
  );
  res.send(response);
});

// Save workout
apiRouter.post("/save-workout", (req, res) => {
  DB.save_workout(req.body);
  res.sendStatus(200);
});

// load all workouts
apiRouter.post("/all-workouts", async (req, res) => {
  const response = await DB.all_workouts(req.body.username);
  res.send(response);
});

app.use((req, res, next) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
