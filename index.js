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
apiRouter.get("/workouts", (req, res) => {
  console.log("API get workouts route");
  const workouts = getWorkouts();
  console.log(workouts);
  res.send(workouts);
});

app.use((req, res, next) => {
  // If the request is not for an API route, send the index.html file.
  res.sendFile("index.html", { root: "public" });
});

/*========Helper Functions=======*/
function getWorkouts() {
  // Get previous workouts from database
  // Return an array of objects
    return [
    { name: "pushups", sets: 3, reps: 10, weight: 0 },
    { name: "pullups", sets: 3, reps: 10, weight: 0 },
    { name: "squats", sets: 3, reps: 10, weight: 145 },
    { name: "bench press", sets: 3, reps: 10, weight: 145 },
    { name: "deadlift", sets: 3, reps: 10, weight: 145 },
    { name: "overhead press", sets: 3, reps: 10, weight: 95 },
    { name: "dips", sets: 3, reps: 10, weight: 0 },
    { name: "lunges", sets: 3, reps: 10, weight: 0 },
    { name: "bicep curls", sets: 3, reps: 10, weight: 45 },
    { name: "tricep extensions", sets: 3, reps: 10, weight: 45 },
    { name: "leg extensions", sets: 3, reps: 10, weight: 45 },
    { name: "leg curls", sets: 3, reps: 10, weight: 45 },
    { name: "shoulder press", sets: 3, reps: 10, weight: 45 },
    { name: "shoulder shrugs", sets: 3, reps: 10, weight: 45 },
  ];
}