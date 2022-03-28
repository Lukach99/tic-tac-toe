const fields = document.querySelectorAll(".game div");
const h1Element = document.querySelector("h1");

const cross = `
          <span class="cross">
            <span class="cross-1"> </span>
            <span class="cross-2"> </span>
          </span>`;

const circle = `<span class="circle"> </span>`;

let player;

const gameElement = document.querySelector("main .game");
gameElement.remove();

const playerChoiceList = document.querySelectorAll(".player-choice div div");

playerChoiceList[0].innerHTML = cross;
playerChoiceList[1].innerHTML = circle;

const playerChoice = document.querySelector(".player-choice");
console.log(playerChoice.innerHTML);

playerChoiceList.forEach((mark) => {
  mark.addEventListener("click", (event) => {
    if (mark.innerHTML === cross) {
      player = cross;
      playerChoice.style.opacity = "0";
      setTimeout(() => playerChoice.remove(), 200);

      gameElement.style.opacity = "1";
      setTimeout(() => document.querySelector("main").append(gameElement), 200);
    } else if (mark.innerHTML === circle) {
      player = circle;
      playerChoice.style.opacity = "0";
      setTimeout(() => playerChoice.remove(), 200);

      gameElement.style.opacity = "1";
      setTimeout(() => document.querySelector("main").append(gameElement), 200);
    }
  });
});

fields.forEach((field) => {
  field.addEventListener("click", (event) => {
    if (h1Element.innerText === "Tic-Tac-Toe") {
      addMark(field);
    }
  });
});

function addMark(position) {
  if (player === cross && position.innerHTML === ``) {
    position.innerHTML = cross;
    gameLogic(player);
    player = circle;
  } else if (player === circle && position.innerHTML === ``) {
    position.innerHTML = circle;
    gameLogic(player);
    player = cross;
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
    winLine("top");
  } else if (gameLogicDivs(3, 4, 5)) {
    whoWon(player);
    winLine("middle");
  } else if (gameLogicDivs(6, 7, 8)) {
    whoWon(player);
    winLine("bottom");
  }

  /* vertical */
  if (gameLogicDivs(0, 3, 6)) {
    whoWon(player);
    winLine("left");
  } else if (gameLogicDivs(1, 4, 7)) {
    whoWon(player);
    winLine("mid");
  } else if (gameLogicDivs(2, 5, 8)) {
    whoWon(player);
    winLine("right");
  }

  /* diagonal */
  if (gameLogicDivs(0, 4, 8)) {
    whoWon(player);
    winLine("lt-rb");
  } else if (gameLogicDivs(2, 4, 6)) {
    whoWon(player);
    winLine("lb-rt");
  }
}

function winLine(position) {
  const lineElement = document.createElement("span");
  lineElement.classList.add(`line-${position}`);
  document.querySelector("main .game").prepend(lineElement);
}

function gameLogicDivs(index1, index2, index3) {
  return (
    fields[index1].innerHTML === player &&
    fields[index2].innerHTML === player &&
    fields[index3].innerHTML === player
  );
}

function whoWon(player) {
  if (player === cross) {
    document.querySelector("h1").innerText = "Player 1 WINS";
  } else {
    document.querySelector("h1").innerText = "Player 2 WINS";
  }
}
