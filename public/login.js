let logged_in = false;
/*
TODO:
-check adding todays worout to page
-add /:selected_workout to API calls,
-create MongoDB database
*/

function login() {
  let username = document.querySelector(".login-input").value;
  if (username === "") {
    username = "anonymous";
  }

  logged_in = true;
  move_card_container();
  add_hover_effect();
  add_text_to_cards();
  turn_off_hero();
  turn_on_welcome(username);
}

function add_hover_effect() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.add("card-alt");
  });
}

function move_card_container() {
  const card_container = document.querySelector(".card-container");
  card_container.classList.add("move-right");
}

function add_text_to_cards() {
  const card_text = document.querySelectorAll(".card-text");
  card_text.forEach((text) => {
    text.style.display = "block";
    text.style.animation = "fade-in 2s forwards";
  });
}

function turn_off_hero() {
  const cont = document.querySelector(".title-container");
  cont.style.display = "none";

  const hero = document.querySelector(".hero");
  hero.style.display = "none";

  const login = document.querySelector(".login-container");
  login.style.display = "none";
}

function turn_on_welcome(username) {
  const title = document.querySelector(".welcome-title");
  title.innerHTML = "welcome, " + username;

  const welcome = document.querySelector(".welcome-container");
  welcome.style.display = "flex";
  welcome.style.animation = "fade-in 2s forwards";
}

function key_press(event) {
  if (event.key === "Enter") {
    login();
  }
}

function expand_contents(event) {
  if (!logged_in) return;
  console.log("expand");
  const text = event.currentTarget.querySelector(".card-text");
  text.style.animation = "expand-text .3s forwards";
  text.style.textShadow = "black 2px 5px 5px";

  const card_image = event.currentTarget.querySelector(".card-image");
  card_image.style.animation = "expand-image 20s forwards";
}

function shrink_contents(event) {
  if (!logged_in) return;
  console.log("shrink");
  const text = event.currentTarget.querySelector(".card-text");
  text.style.animation = "shrink-text 0.35s backwards";
  text.style.textShadow = "none";
  const card_image = event.currentTarget.querySelector(".card-image");
  card_image.style.animation = "shrink-image 0.35s backwards";
}

function transition_to_today(selected_workout) {
  if (!logged_in) return;
  localStorage.setItem("selected_workout", selected_workout);

  fade_cards();

  setTimeout(() => {
    slide_menu();
    slide_workouts(selected_workout);
  }, 1000);
}

function fade_cards() {
  const card = document.querySelector(".card-container");
  const welcome = document.querySelector(".welcome-container");

  card.style.animation = "fade-out 1s forwards";
  welcome.style.animation = "fade-out 1s forwards";

  setTimeout(() => {
    card.style.display = "none";
    welcome.style.display = "none";
  }, 1000);
}

function slide_menu() {
  const title = document.querySelector(".menu-container");
  title.style.display = "flex";
  title.style.animation = "slide-menu .5s forwards";

  const body = document.querySelector("body");
  body.style.display = "flex";
  body.style.justifyContent = "center";
}

function slide_workouts(selected_workout) {
  //Query the DOM for the necessary elements
  const today_workout = document.querySelector(".today-workout > h2");
  const prev_workout = document.querySelector(".prev-workout > h2");
  const today_container = document.querySelector(".today-container");
  const today = document.querySelector(".today-workout");
  const prev = document.querySelector(".prev-workout");

  //Change the text of the workout titles to match the selected workout
  today_workout.innerHTML = "today's<br>" + selected_workout + "<br>workout";
  prev_workout.innerHTML = "previous<br>" + selected_workout + "<br>workouts";

  //populate the previos workout container with the previous workouts
  pop_prev_workouts(selected_workout);
  pop_today_workouts(selected_workout);

  //Display the workout containers
  today_container.style.display = "flex";
  today.style.display = "flex";
  prev.style.display = "flex";

  //Animate the workout containers
  today.style.animation = "slide-workout-top .75s forwards";
  prev.style.animation = "slide-workout-bottom .75s forwards";
}

async function pop_prev_workouts(selected_workout) {
  let workouts = [];
  try {
    const response = await fetch("/api/workouts/" + selected_workout);
    workouts = await response.json();

    workouts.forEach((workout) => {
      insert_workout(workout, ".prev-workout-info-container");
    });
  } catch {
    console.log("error");
  }
}

async function pop_today_workouts(selected_workout) {
  let workouts = [];
  try {
    const response = await fetch("/api/today-workouts/" + selected_workout);
    workouts = await response.json();
    workouts.forEach((workout) => {
      insert_workout(workout, ".today-workout-info-container");
    });
  } catch {
    console.log("error");
  }
}

function insert_workout(workout, parent_name) {
  const container = workout_item(
    workout.name,
    workout.sets,
    workout.reps,
    workout.weight
  );

  const parent = document.querySelector(parent_name);
  parent.appendChild(container);
  if (parent.offsetHeight > 400) {
    parent.style.overflowY = "scroll";
    parent.style.scrollbarGutter = "none";
    parent.style.scrollbar = "none";
    parent.style.scrollBehavior = "smooth";
    parent.style.height = "400px";
  }
}

function workout_item(w_name, w_sets, w_reps, w_weight) {
  const container = document.createElement("div");
  const name = document.createElement("p");
  const set = document.createElement("p");
  const rep = document.createElement("p");
  const lbs = document.createElement("p");

  name.innerText = w_name;
  set.innerText = w_sets;
  rep.innerText = w_reps;
  lbs.innerText = w_weight;

  if (name.innerText === "") name.innerText = "unknown";
  if (set.innerText === "") set.innerText = "unknown";
  if (rep.innerText === "") rep.innerText = "unknown";
  if (lbs.innerText === "") lbs.innerText = "unknown";

  container.appendChild(name);
  container.appendChild(set);
  container.appendChild(rep);
  container.appendChild(lbs);

  container.classList.add("workout_items");
  container.style.fontWeight = "200";
  container.style.color = "white";
  container.style.width = "100%";

  return container;
}

function create_input_fields() {
  console.log("create input fields");
  //creat a container for the input fields
  const input_container = document.createElement("div");
  input_container.id = "user-input-container";
  input_container.style.width = "100%";
  input_container.style.display = "flex";
  input_container.style.justifyContent = "space-between";

  //insert input field into add button
  const input_field = document.createElement("input");
  input_field.id = "name";
  input_field.classList.add("add-input");
  input_field.placeholder = "workout name";
  input_field.style.width = "40%";
  input_field.style.borderRadius = "20px 5px 5px 20px";
  input_container.appendChild(input_field);

  //insert input field into add button for sets
  const input_field_sets = document.createElement("input");
  input_field_sets.id = "sets";
  input_field_sets.classList.add("add-input");
  input_field_sets.placeholder = "sets";
  input_field_sets.style.width = "11%";
  input_field_sets.style.borderRadius = "5px";
  input_container.appendChild(input_field_sets);

  //insert input field into add button for reps
  const input_field_reps = document.createElement("input");
  input_field_reps.id = "reps";
  input_field_reps.classList.add("add-input");
  input_field_reps.placeholder = "reps";
  input_field_reps.style.width = "11%";
  input_field_reps.style.borderRadius = "5px";
  input_container.appendChild(input_field_reps);

  //insert input field into add button for weight
  const input_field_weight = document.createElement("input");
  input_field_weight.id = "lbs";
  input_field_weight.classList.add("add-input");
  input_field_weight.placeholder = "lbs";
  input_field_weight.style.width = "11%";
  input_field_weight.style.borderRadius = "5px";
  input_container.appendChild(input_field_weight);

  //insert save button into add button
  const save_button = document.createElement("button");
  save_button.classList.add("save-button");
  save_button.innerHTML = "save";
  input_container.appendChild(save_button);

  const parent = document.querySelector(".today-workout-info-container");
  parent.appendChild(input_container);

  const save_button_element = document.querySelector(".save-button");
  save_button_element.addEventListener("click", () => {
    save_workout();
  });
}

function add_workout() {
  const add_button = document.querySelector(".add-button");
  //add a new event listener to the add button for clicking
  add_button.setAttribute("onclick", "revert_to_add_button()");

  //remove classList from button
  add_button.classList.remove("add-button");
  add_button.classList.add("cancel-button");
  add_button.classList.remove("add-button-hover");
  add_button.classList.add("cancel-button-hover");

  //change the text of the button
  const button_text = document.querySelector(".cancel-button > p");
  button_text.innerText = "cancel";

  create_input_fields();
}

function cancel() {
  const add_button = document.querySelector(".cancel-button");

  //remove classList from button
  add_button.classList.remove("cancel-button");
  add_button.classList.add("add-button");

  add_button.classList.remove("cancel-button-hover");
  add_button.classList.add("add-button-hover");

  //add a new event listener to the add button for clicking
  add_button.setAttribute("onclick", "add_workout()");

  const button_text = document.querySelector(".add-button > p");
  button_text.innerText = "add";

  const input_container = document.querySelector("#user-input-container");
  if (input_container) input_container.remove();
}

function save_workout() {
  const name = document.querySelector("#name").value;
  const sets = document.querySelector("#sets").value;
  const reps = document.querySelector("#reps").value;
  const lbs = document.querySelector("#lbs").value;
  
  const container = workout_item(
    name,
    sets,
    reps,
    lbs
  );

  const parent = document.querySelector(".today-workout-info-container");
  parent.appendChild(container);
  if (parent.offsetHeight > 400) {
    parent.style.overflowY = "scroll";
    parent.style.scrollbarGutter = "none";
    parent.style.scrollbar = "none";
    parent.style.scrollBehavior = "smooth";
    parent.style.height = "400px";
  }

  //save the workout to the database
  save_workout_to_db(name, sets, reps, lbs);

  cancel();
}

function save_workout_to_db(name, sets, reps, lbs) {
  
  const workout = {
    workout: localStorage.getItem("selected_workout"),
    date: new Date().toDateString(),
    name: name.toLowerCase(),
    sets: sets,
    reps: reps,
    lbs: lbs,
  };

  try {
    const response = fetch("api/save-workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });

    if (response.status !== 200) throw new Error("error");
  } catch {
    console.log("error");
  }
}

function return_to_choices() {
  const card_container = document.querySelector(".card-container");
  const welcome_container = document.querySelector(".welcome-container");

  console.log(card_container);

  //slide the workout container up
  const today = document.querySelector(".today-workout");
  const prev = document.querySelector(".prev-workout");

  today.style.animation = "slide-workout-top-out 0.5s forwards ease-in-out";
  prev.style.animation = "slide-workout-bottom-out 0.5s forwards ease-in-out";

  setTimeout(() => {
    today.style.display = "none";
    prev.style.display = "none";
  }, 500);

  setTimeout(() => {
    card_container.setAttribute("style", "display: flex;");
    card_container.style.animation = "fade-in 0.75s forwards";
    card_container.setAttribute("class", "card-container");
    card_container.style.opacity = "0";
    card_container.style.position = "absolute";
    card_container.style.height = "fit-content";
    card_container.style.bottom = "50%";
    card_container.style.left = "50%";
    card_container.style.transform = "translate(-50%, 50%)";
  }, 500);
}

function view_all() {
  //redirect to the all workouts page
  window.location.href = "all.html";
}

function reload_page() {
  console.log("Reloading page");
  location.reload();
}

