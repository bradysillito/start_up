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

// Login
apiRouter.post("/login", (req, res) => {
  console.log("login touched");
  if (login(req.body) === true) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Get Previous workout Data
apiRouter.get("/workouts/:selected_workout", (req, res) => {
  //TODO: make sure to get it based off the user
  res.send(prev_workouts(req.params.selected_workout));
});

// Get Todays workout
apiRouter.get("/today-workouts/:selected_workout", (req, res) => {
  res.send(todays_workout(req.params.selected_workout));
});

// Save workout
apiRouter.post("/save-workout", (req, res) => {
  save_workout(req.body);
  res.sendStatus(200);
});

// load all workouts
apiRouter.get("/all-workouts", (req, res) => {
  res.send(workouts);
});

app.use((req, res, next) => {
  // If the request is not for an API route, send the index.html file.
  res.sendFile("index.html", { root: "public" });
});

/*========Helper Functions=======*/
let workouts = [];
let fakeUsers = [
  { username: "test" },
  { username: "user" },
  { username: "coolguy" },
  { username: "brady" },
];


let username;
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

  //sort workouts by date newest to oldest
  temp.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  //reverse array so oldest is first
  temp.reverse();
  temp.forEach((workout) => {
    workouts.push(workout);
  });
}

function login(req_body) {
  username = req_body.username;
  if (fakeUsers.find((user) => user.username === username)) {
    return true;
  }
  return false;
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
  let todays_workouts = [];
  filtered_workouts.forEach((workout) => {
    if (workout.date === new Date().toDateString()) {
      todays_workouts.push(workout);
    }
  });

  return todays_workouts;
}

function save_workout(workout) {
  workouts.push(workout);
}
