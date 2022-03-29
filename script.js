const fields = document.querySelectorAll(".game div");
const h1Element = document.querySelector("h1");
const mainElement = document.querySelector("main");
const gameElement = document.querySelector(".game");
const playerChoiceList = document.querySelectorAll(".player-choice div div");
const playerChoice = document.querySelector(".player-choice");
const scoreboardElement = document.querySelector(".scoreboard");

const cross = `
          <span class="cross">
            <span class="cross-1 shadow-mark"> </span>
            <span class="cross-2 shadow-mark"> </span>
          </span>`;

const circle = `<span class="circle shadow-mark"> </span>`;

class Player {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
    this.score = 0;
  }
}

let player;

let player1;
let player2;

playerChoiceList[0].innerHTML = cross;
playerChoiceList[1].innerHTML = circle;

gameElement.remove();
scoreboardElement.remove();

player1mark();

function player1mark() {
  playerChoiceList.forEach((mark) => {
    mark.addEventListener("click", (event) => {
      if (mark.innerHTML === cross) {
        player1 = new Player("Player 1", cross);
        player2 = new Player("Player 2", circle);

        player = player1.mark;
        mainElement.prepend(gameElement);
        playerChoice.remove();
        mainElement.append(scoreboardElement);
      } else if (mark.innerHTML === circle) {
        player1 = new Player("Player 1", circle);
        player2 = new Player("Player 2", cross);

        player = player1.mark;
        playerChoice.remove();
        mainElement.prepend(gameElement);
        mainElement.append(scoreboardElement);
      }
    });
  });
}

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

function gameLogic(player) {
  /* horizontal */
  if (gameLogicDivs(0, 1, 2)) {
    winLine("top");
    whoWon(player);
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

  /* checking if its draw */
  if (checkDraw() === 0 && h1Element.innerText === "Tic-Tac-Toe") {
    document.querySelector("h1").innerText = "its draw";
    restartButton();
  }
}
const lineElement = document.createElement("span");

function winLine(position) {
  lineElement.classList.add(`line-${position}`);

  gameElement.prepend(lineElement);
}

function gameLogicDivs(index1, index2, index3) {
  return (
    fields[index1].innerHTML === player &&
    fields[index2].innerHTML === player &&
    fields[index3].innerHTML === player
  );
}

function whoWon(player) {
  if (player === player1.mark) {
    h1Element.innerText = "Player 1 WINS";
    player1.score++;
    document.querySelector(".player1-score").innerText = `${player1.score}`;
    restartButton();
  } else if (player === player2.mark) {
    h1Element.innerText = "Player 2 WINS";
    player2.score++;
    document.querySelector(".player2-score").innerText = `${player2.score}`;
    restartButton();
  }
}

function checkDraw() {
  let emptyPos = 0;
  fields.forEach((field) => {
    if (field.innerHTML === "") {
      emptyPos++;
    }
  });
  return emptyPos;
}

function restartButton() {
  const restartBtnElement = document.createElement("button");
  restartBtnElement.classList.add("restart-btn");
  restartBtnElement.innerText = "Play Again?";
  mainElement.append(restartBtnElement);

  restartBtnElement.addEventListener("click", (event) =>
    fields.forEach((field) => {
      field.innerHTML = ``;
      lineElement.className = "";
      lineElement.remove();
      restartBtnElement.remove();
      h1Element.innerText = "Tic-Tac-Toe";
      player = player1.mark;
    })
  );
}
