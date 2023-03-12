window.onload = function() {
    let input = document.getElementById('input');
    console.log("ON load");
    if(input !== null){
        input.style.display = "none";
    }
}

function add(){
    let add = document.getElementById('add');
    let input = document.getElementById('input');
    add.style.display = "none";
    input.style.display = "grid";
}

function save(){
    let add = document.getElementById('add');
    let input = document.getElementById('input');
    add.style.display = "flex";
    input.style.display = "none";
    console.log("save");
    createWorkout();
}

function createWorkout(){
    const workout = document.getElementById('workout').value;
    const reps = document.getElementById('reps').value;
    const sets = document.getElementById('sets').value;
    const weight = document.getElementById('weight').value;

    const newWorkout = document.querySelector('.input-card__content').cloneNode(true);
    const children =  newWorkout.children;

    children[0].textContent = workout;
    children[1].textContent = reps;
    children[2].textContent = sets;
    children[3].textContent = weight;

    const workoutList = document.querySelector('.input-card__content-wrapper');
    workoutList.appendChild(newWorkout);
}
