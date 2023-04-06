function login() {
  let username = document.querySelector(".login-input").value;
  if (username === "") {
    username = "anonymous";
  }

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
  });
}

function turn_off_hero() {
  const cont = document.querySelector(".title-container");
  cont.style.display = "none";

  const hero = document.querySelector(".hero");
  hero.style.display = "none";
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