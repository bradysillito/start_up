function reload_page() {
  //redirect to home page
  window.location.href = "login.html";
}

function view_all() {
  //reload page
  window.location.href = "all.html";
}

function return_to_choices() {
  window.location.href = "login.html";
  console.log("return to choices");
}

async function load_workouts() {
  console.log("load workouts");
  let workouts = [];
  try {
    const response = await fetch("/api/all-workouts");
    workouts = await response.json();
    workouts.forEach((workout) => {
      insert_workouts(workout);
    });
  } catch (error) {
    console.log(error);
  }
}

function insert_workouts(workout) {
  const container = workout_item(workout);
  document.querySelector(".log-results").appendChild(container);
}

function workout_item(item) {
  const container = document.createElement("div");
  const workout = document.createElement("p");
  const name = document.createElement("p");
  const sets = document.createElement("p");
  const reps = document.createElement("p");
  const weight = document.createElement("p");
  const date = document.createElement("p");

  workout.innerText = item.workout;
  name.innerText = item.name;
  sets.innerText = item.sets;
  reps.innerText = item.reps;
  weight.innerText = item.weight;
  date.innerText = item.date;

  container.appendChild(workout);
  container.appendChild(name);
  container.appendChild(sets);
  container.appendChild(reps);
  container.appendChild(weight);
  container.appendChild(date);

  container.classList.add("workout_items");
  container.style.fontWeight = "200";
  container.style.color = "white";
  container.style.width = "100%";

  return container;
}
