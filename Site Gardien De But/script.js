function average(game, goal) {
  const number1 = goal * 60;
  const number2 = game * 60;
  const average = number1 / number2;

  return Math.round(average * 100) / 100;
}
let data = {};
const staticData = {
  nextId: 5,
  goalies: [
    {
      id: 0,
      team: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png",
      name: "Jeremy",
      lastname: "Swayman",
      game: 11,
      goal: 16,
    },

    {
      id: 1,
      team: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Carolina_Hurricanes.svg/1200px-Carolina_Hurricanes.svg.png",
      name: "Alex",
      lastname: "Nedeljkovic",
      game: 32,
      goal: 66,
    },

    {
      id: 2,
      team: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Colorado_Avalanche_logo.svg/1200px-Colorado_Avalanche_logo.svg.png",
      name: "Philipp",
      lastname: "Grubauer",
      game: 50,
      goal: 103,
    },

    {
      id: 3,
      team: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/1200px-Vegas_Golden_Knights_logo.svg.png",
      name: "Marc-Andre",
      lastname: "Fleury",
      game: 52,
      goal: 104,
    },

    {
      id: 4,
      team: "https://cdn.freebiesupply.com/logos/large/2x/new-york-islanders-logo.png",
      name: "Semyon",
      lastname: "Varlamov",
      game: 50,
      goal: 106,
    },
  ],
};

function autoLoad() {
  if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(staticData));
  }
  data = JSON.parse(localStorage.getItem("data"));
}

function clearValue(team, name, lastname, game, goal) {
  team.value = null;
  name.value = null;
  lastname.value = null;
  game.value = null;
  goal.value = null;
}
function addOnePlayer(i) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML += `
    <tr id = ${i}>
          <td id = team2${i}>
            <img
              src= "${data.goalies[i].team}"
            />
          </td>
          <td id = name2${i}>${data.goalies[i].name}</td>
          <td id = lastname2${i}>${data.goalies[i].lastname}</td>
          <td id = game2${i}>${data.goalies[i].game}</td>
          <td id = goal2${i}>${data.goalies[i].goal}</td>
          <td id = average2${i}>${average(
    data.goalies[i].game,
    data.goalies[i].goal
  )}</td>
          <td id = button${i}><i class="fas fa-edit" onclick="modifiedPlayer(${i})" ></i> / <i class="fas fa-trash" onclick="deletePlayer(${i})" ></i></td>
    </tr>
         
        `;
}

function run() {
  console.log(data);
  /// Boucle pour l'ajout des 5 premier gardien
  for (let i = 0; i < data.goalies.length; i++) {
    addOnePlayer(i);
  }
}

function setColor(i, color) {
  const team2 = document.getElementById(`team2${i}`);
  team2.style.backgroundColor = color;
  const name2 = document.getElementById(`name2${i}`);
  name2.style.backgroundColor = color;
  const lastname2 = document.getElementById(`lastname2${i}`);
  lastname2.style.backgroundColor = color;
  const game2 = document.getElementById(`game2${i}`);
  game2.style.backgroundColor = color;
  const goal2 = document.getElementById(`goal2${i}`);
  goal2.style.backgroundColor = color;
  const average = document.getElementById(`average2${i}`);
  average.style.backgroundColor = color;
  const button = document.getElementById(`button${i}`);
  button.style.backgroundColor = color;
}

function addPlayer() {
  const team = document.getElementById("team");
  const name = document.getElementById("name");
  const lastname = document.getElementById("lastname");
  const game = document.getElementById("game");
  const goal = document.getElementById("goal");

  if (
    !name.checkValidity() ||
    !lastname.checkValidity() ||
    !game.checkValidity() ||
    !goal.checkValidity()
  ) {
    alert("Il manque des champs a remplir ");
    return;
  }

  if (!team.value) {
    team.value =
      "https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg";
  }

  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  data.goalies.push({
    id: data.nextId++,
    team: team.value,
    name: name.value,
    lastname: lastname.value,
    game: game.value,
    goal: goal.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  run();
  clearValue(team, name, lastname, game, goal);
}

function deletePlayer(i) {
  var answer = window.confirm(
    "Est tu certain de vouloir supprimer les données du gardien ? "
  );

  if (answer) {
    for (let b = 0; b < data.goalies.length; b++) {
      const player = document.getElementById(`${b}`);
      player.remove();
    }

    data.goalies.splice(i, 1);
    localStorage.setItem("data", JSON.stringify(data));

    run();
  } else {
    return;
  }
}
function modifiedPlayer(i) {
  const modification = (document.getElementById("modification").innerHTML =
    "Modification Gardien");
  const buttonchange = (document.getElementById(
    "button"
  ).innerHTML = `<th id="button"></th><i class="fas fa-check" onclick="Uptatedplayer(${i})"></i><i class="fas fa-user-times" onclick="Return(${i})"></i></th>`);

  const team = document.getElementById("team");
  const name = document.getElementById("name");
  const lastname = document.getElementById("lastname");
  const game = document.getElementById("game");
  const goal = document.getElementById("goal");

  team.value = data.goalies[i].team;
  name.value = data.goalies[i].name;
  lastname.value = data.goalies[i].lastname;
  game.value = data.goalies[i].game;
  goal.value = data.goalies[i].goal;
  setColor(i, "WHITE");

  for (let b = 0; b < data.goalies.length; b++) {
    const button = document.getElementById(`button${b}`);
    button.innerHTML = `<td id = button${b}><i class="fas fa-lock"></i></td>`;
  }
}

function Uptatedplayer(i) {
  const team = document.getElementById("team");
  const name = document.getElementById("name");
  const lastname = document.getElementById("lastname");
  const game = document.getElementById("game");
  const goal = document.getElementById("goal");

  data.goalies[i].team = team.value;
  data.goalies[i].name = name.value;
  data.goalies[i].lastname = lastname.value;
  data.goalies[i].game = game.value;
  data.goalies[i].goal = goal.value;
  localStorage.setItem("data", JSON.stringify(data));

  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();

  const modification = (document.getElementById(
    "modification"
  ).innerHTML = `<th id="modification">Rajouter Gardien</th>`);
  const buttonchange = (document.getElementById(
    "button"
  ).innerHTML = `<button id="addButton" class="fas fa-user-plus" onclick="addPlayer()"></button>`);

  setColor(i, "#006d75");
  clearValue(team, name, lastname, game, goal);
}

function Return(i) {
  const team = document.getElementById("team");
  const name = document.getElementById("name");
  const lastname = document.getElementById("lastname");
  const game = document.getElementById("game");
  const goal = document.getElementById("goal");

  const modification = (document.getElementById(
    "modification"
  ).innerHTML = `<th id="modification">Rajouter Gardien</th>`);
  const buttonchange = (document.getElementById(
    "button"
  ).innerHTML = `<button id="addButton" class="fas fa-user-plus" onclick="addPlayer()"></button>`);
  clearValue(team, name, lastname, game, goal);
  setColor(i, "#006d75");

  for (let b = 0; b < data.goalies.length; b++) {
    const button = document.getElementById(`button${b}`);
    button.innerHTML = `<td id = button${b}><i class="fas fa-edit" onclick="modifiedPlayer(${b})" ></i> / <i class="fas fa-trash" onclick="deletePlayer(${b})" ></i></td>`;
  }
}

function sortTeamUp() {
  data.goalies.sort(function (a, b) {
    let x = a.team.toLowerCase();
    let y = b.team.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortTeamDown() {
  data.goalies.sort(function (a, b) {
    let x = a.team.toLowerCase();
    let y = b.team.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  data.goalies.reverse();
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}

function reset() {
  data.goalies.sort(function (a, b) {
    return a.id - b.id;
  });
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}

function sortNameUp() {
  data.goalies.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortNameDown() {
  data.goalies.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  data.goalies.reverse();
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortLastNameUp() {
  data.goalies.sort(function (a, b) {
    let x = a.lastname.toLowerCase();
    let y = b.lastname.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortLastNameDown() {
  data.goalies.sort(function (a, b) {
    let x = a.lastname.toLowerCase();
    let y = b.lastname.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  data.goalies.reverse();
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortGameUp() {
  data.goalies.sort(function (a, b) {
    return a.game - b.game;
  });
  data.goalies.reverse();
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}

function sortGameDown() {
  data.goalies.sort(function (a, b) {
    return a.game - b.game;
  });

  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortGoalUp() {
  data.goalies.sort(function (a, b) {
    return a.goal - b.goal;
  });
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortGoalDown() {
  data.goalies.sort(function (a, b) {
    return a.goal - b.goal;
  });
  data.goalies.reverse();
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}

function sortAverageUp() {
  data.goalies.sort(function (a, b) {
    return average(a.game, a.goal) - average(b.game, b.goal);
  });
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}
function sortAverageDown() {
  data.goalies.sort(function (a, b) {
    return average(a.game, a.goal) - average(b.game, b.goal);
  });
  data.goalies.reverse();
  for (let b = 0; b < data.goalies.length; b++) {
    const player = document.getElementById(`${b}`);
    player.remove();
  }
  run();
}

autoLoad();
run();

const nameinput = document.getElementById("name");
const button = document.getElementById("addButton");
const lastnameinput = document.getElementById("lastname");
const gameinput = document.getElementById("game");
const goalinput = document.getElementById("goal");

nameinput.addEventListener("keydown", () => {
  if (nameinput.value.length > 15) {
    nameinput.style.backgroundColor = "red";
    button.disabled = true;
  } else if (nameinput.value.length == 0) {
    button.disabled = true;
  } else {
    nameinput.style.backgroundColor = "";
    button.disabled = false;
  }
});

lastnameinput.addEventListener("keydown", () => {
  if (lastnameinput.value.length > 15) {
    lastnameinput.style.backgroundColor = "red";
    button.disabled = true;
  } else {
    lastnameinput.style.backgroundColor = "";
    button.disabled = false;
  }
});

gameinput.addEventListener("change", () => {
  if (gameinput.value > 100 || gameinput.value < 0) {
    gameinput.style.backgroundColor = "red";
    button.disabled = true;
  } else {
    gameinput.style.backgroundColor = "";
    button.disabled = false;
  }
});

goalinput.addEventListener("change", () => {
  if (goalinput.value > 200 || goalinput.value < 0) {
    goalinput.style.backgroundColor = "red";
    button.disabled = true;
  } else {
    goalinput.style.backgroundColor = "";
    button.disabled = false;
  }
});
