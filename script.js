const fields = document.querySelectorAll("div");

const h1Element = document.querySelector("h1");

console.log(fields);

console.log(fields[0].innerHTML);

const player1 = `
          <span class="cross">
            <span class="cross-1"> </span>
            <span class="cross-2"> </span>
          </span>`;

const player2 = `<span class="circle"> </span>`;

let player = player1;

fields.forEach((field) => {
  field.addEventListener("click", (event) => {
    if (h1Element.innerText === "Tic-Tac-Toe") {
      addMark(field);
    }
  });
});

function addMark(position) {
  if (player === player1 && position.innerHTML === ``) {
    position.innerHTML = player1;
    gameLogic(player);
    player = player2;
  } else if (player === player2 && position.innerHTML === ``) {
    position.innerHTML = player2;
    gameLogic(player);
    player = player1;
  }
}

/* function gameLogic(player) {
  switch (player) {
    case fields[0].innerHTML === player &&
      fields[1].innerHTML === player &&
      fields[2].innerHTML === player:
      if (player === player1) {
        console.log("succes 1");
      } else {
        console.log("succes 2");
      }
  }
} */

function gameLogic(player) {
  /* horizontal */
  if (gameLogicDivs(0, 1, 2)) {
    whoWon(player);
  } else if (gameLogicDivs(3, 4, 5)) {
    whoWon(player);
  } else if (gameLogicDivs(6, 7, 8)) {
    whoWon(player);
  }

  /* vertical */
  if (gameLogicDivs(0, 3, 6)) {
    whoWon(player);
  } else if (gameLogicDivs(1, 4, 7)) {
    whoWon(player);
  } else if (gameLogicDivs(2, 5, 8)) {
    whoWon(player);
  }

  /* diagonal */
  if (gameLogicDivs(0, 4, 8)) {
    whoWon(player);
  } else if (gameLogicDivs(2, 4, 6)) {
    whoWon(player);
  }
}

function gameLogicDivs(index1, index2, index3) {
  return (
    fields[index1].innerHTML === player &&
    fields[index2].innerHTML === player &&
    fields[index3].innerHTML === player
  );
}

function whoWon(player) {
  if (player === player1) {
    document.querySelector("h1").innerText = "Player 1 WINS";
  } else {
    document.querySelector("h1").innerText = "Player 2 WINS";
  }
}
