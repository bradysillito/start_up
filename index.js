const express = require("express");
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*========API routes=======*/

// Test route
apiRouter.get("/test", (req, res) => {
  console.log("API test route");
  res.send("API test route");
});

// Get Previous workout Data
apiRouter.get("/workouts/:selected_workout", (req, res) => {
  res.send(prev_workouts(req.params.selected_workout));
});

// Get Todays workout
apiRouter.get("/today-workouts/:selected_workout", (req, res) => {
  console.log("Getting todays workout: " + req.params.selected_workout);
  res.send(todays_workout(req.params.selected_workout));
});

// Save workout
apiRouter.post("/save-workout", (req, res) => {
  console.log("Saving workout");
  res.sendStatus(200);
});

app.use((req, res, next) => {
  // If the request is not for an API route, send the index.html file.
  res.sendFile("index.html", { root: "public" });
});

/*========Helper Functions=======*/
let workouts = [];
populate_workouts();
function populate_workouts() {
  // Get previous workouts from database
  // Return an array of objects
  let temp = [
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "bench press",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "incline bench press",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell flys",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell press",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell pullover",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell flys",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell press",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell pullover",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Chest",
      name: "dumbell flys",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: new Date().toDateString(),
      workout: "Chest",
      name: "dumbell press",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: new Date().toDateString(),
      workout: "Chest",
      name: "dumbell pullover",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Leg",
      name: "squats",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Leg",
      name: "leg press",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: "Mon Jun 14 2021",
      workout: "Leg",
      name: "leg extensions",
      sets: 3,
      reps: 10,
      weight: 100,
    },
    {
      date: new Date().toDateString(),
      workout: "Leg",
      name: "leg curls",
      sets: 3,
      reps: 10,
      weight: 100,
    },
  ];

  temp.forEach((workout) => {
    workouts.push(workout);
  });
}

function prev_workouts(selected_workout) {
  //iterate through workouts and return all with selected workout
  let prev_workout = [];
  workouts.forEach((workout) => {
    if (workout.workout.toLowerCase() === selected_workout) {
      prev_workout.push(workout);
    }
  });

  return prev_workout;
}

function todays_workout(selected_workout) {

  let filtered_workouts = prev_workouts(selected_workout);

  console.log("Getting todays workout");
  //iterate through workouts and return all with todays date
  let todays_workouts = [];
  filtered_workouts.forEach((workout) => {
    if (workout.date === new Date().toDateString()) {
      todays_workouts.push(workout);
    }
  });

  return todays_workouts;
}

