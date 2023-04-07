let logged_in = false;

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

function transition_to_today() {
  if (!logged_in) return;
  console.log("transition");
  change_background();
  fade_cards();

  setTimeout(() => {
    slide_menu();
    slide_workouts();
  }, 1000);
}

function change_background() {
  const body = document.querySelector(".body-background");
  body.style.animation = "change-background-body 2s forwards";

  const background = document.querySelector(".background-replacement");
  background.style.animation = "change-background 2s forwards";
}

function fade_cards() {
  const card = document.querySelector(".card-container");
  card.style.animation = "fade-out 1s forwards";

  const welcome = document.querySelector(".welcome-container");
  welcome.style.animation = "fade-out 1s forwards";

  card.addEventListener("animationend", () => {
    card.style.display = "none";
    welcome.style.display = "none";
  });
}

function slide_menu() {
  const title = document.querySelector(".menu-container");
  title.style.display = "flex";
  title.style.animation = "slide-menu .5s forwards";

  const body = document.querySelector("body");
  body.style.display = "flex";
  body.style.justifyContent = "center";
}

function slide_workouts() {
  const today_container = document.querySelector(".today-container");
  today_container.style.display = "flex";

  const today = document.querySelector(".today-workout");
  today.style.display = "flex";
  today.style.animation = "slide-workout-top .75s forwards";

  const prev = document.querySelector(".prev-workout");
  prev.style.display = "flex";
  prev.style.animation = "slide-workout-bottom .75s forwards";
}
