const { MongoClient } = require("mongodb");
const mongoUser = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!mongoUser) throw new Error("DB not connected. Please set environment var");

const uri = `mongodb+srv://${mongoUser}:${password}@${hostname}`;
const client = new MongoClient(uri);

const collection = client.db("workout").collection("workouts");
const users = client.db("workout").collection("users");

function login(user) {
  const result = users.find({ user: user }).toArray();
  if (result.length === 0) return 401;
  return 200;
}

function prev_workouts(selected_workout, username) {
  const query = { user: username, workout: selected_workout };
  const cursor = collection.find(query);
  return cursor.toArray();
}

function todays_workout(selected_workout, username) {
  const query = {
    user: username,
    workout: selected_workout,
    date: new Date().toDateString(),
  };
  const results = collection.find(query);
  return results.toArray();
}

function save_workout(workout) {
  const entry = construct_workout(workout);
  collection.insertOne(entry);
}

async function all_workouts(username) {
  const query = { user: username };
  const cursor = collection.find(query);
  return cursor.toArray();
}

// Test function to add dummy data to database for users
async function sign_up(user) {
  const result = await users.find({ user: user }).toArray();
  if (result.length === 0) await users.insertOne({ user: user });
}

//Test function to add dummy data to database for workouts
async function populate_workouts() {
  let workout_array = [];
  const query = { user: "test", workout: "chest" };
  const result = await collection.find(query).toArray();
  result.forEach((workout) => {
    let workout_entry = construct_workout(workout);
    workout_array.push(workout_entry);
  });
}

function construct_workout(workout) {
  const workout_entry = {
    user: workout.user,
    date: workout.date,
    workout: workout.workout,
    name: workout.name,
    sets: workout.sets,
    reps: workout.reps,
    weight: workout.weight,
  };
  return workout_entry;
}

module.exports = {
  login,
  prev_workouts,
  todays_workout,
  save_workout,
  all_workouts,
  sign_up,
  populate_workouts,
};
