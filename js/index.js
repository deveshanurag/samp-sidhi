//All constants are here

// samp and sidhi ke liye coordinate
const snakeBite = new Audio("../music/eat.mp3");
const ladderClimbe = new Audio("../music/sidhi.mp3");
const gotiMove = new Audio("../music/move.mp3");
const music = new Audio("../music/music.mp3");
const congrates = new Audio("../music/win.mp3");
const ladders = { 4:14, 9: 31, 21:42, 28: 84, 51:67,72:91,80:99};
const snakes = { 17: 7, 62: 19, 64:60, 54: 34 ,87:36,93:73,95:75,98:79};
const boardSize = 10;
const board = document.getElementById("board");
//turn ke liye hai
const cells = [];
let turn = false;

//board lo banaya ja raha hai
function createBoard() {
  let cellCount = 101;
  let reverse = true;

  for (let row = 0; row < boardSize; row++) {
    const rowCells = [];
    let startCell = reverse ? cellCount  - 1 : cellCount + 1;

    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("playing-board-cell");
      cell.setAttribute("id", "playingBoardCell" + startCell);
      //cell.textContent = startCell;
      // if (startCell % 2 == 0) {
      //   cell.style.background = "yellow";
      //   cell.style.color = "black";
      // } else cell.style.background = "green";
       rowCells.push(cell);
      board.appendChild(cell);
      startCell += reverse ? -1 : 1;
    }

    reverse = !reverse;
    if(!reverse)
    {
      cells.push(rowCells);
    }
    else
    {
    cells.push(rowCells.reverse());
    }
    cellCount = startCell - boardSize;
  }
}
//console.log(cells)
createBoard();
//console.log(cells[0][0]);



origin = document.getElementById("playingBoardCell1");
gotti_b = document.createElement("div");

gotti_b.classList.add("got_b");
origin.appendChild(gotti_b);
//pehli bar goti ko allocate kiye hai
let b = 1;
//variable a taki button ko hata sake

gotti_r = document.createElement("div");
gotti_r.classList.add("got_r");
origin.appendChild(gotti_r);
//pehli bar goti ko allocate kiye hai
let r = 1;
//variable a taki button ko hata sake

function rolling() {
  const rollingTurn = document.getElementById("rollingTurn");
  rollingTurn.textContent = "Blue's turn";
  rollingTurn.style.fontSize = "20 px";
  
  

  const button = document.getElementById("rollingDiceRollButton");
  button.addEventListener("click", function () {
    turn = !turn;

    if (turn) {
      rollingTurn.textContent = "Red's Turn";
      rollingTurn.style.color = "red";
    } else {
      rollingTurn.textContent = "Blue's turn";
      rollingTurn.style.color = "blue";
    }

    let randomNumber = Math.round(1 + (6 - 1) * Math.random());
    const num = document.getElementById("rollingDiceNumberDisplay");

    num.textContent = randomNumber;

    //gotti ko remove kro
    if (turn) {
      if ((b == 1 && randomNumber != 1) || ((b + randomNumber) > 100)) {
      } else {
        const removeG = document.querySelector(".got_b");
        if (removeG) {
          removeG.remove();
          gotiMove.play();
        }
        //add kar rhe hai
        

        let ba = b + randomNumber;
        for (let l in ladders) {
          if (ba == l) {
            
            ba = ladders[l];
            ladderClimbe.play();
            console.log('ladder b');
          }
        }
        for (let s in snakes) {
          if (ba == s) {
            
            ba = snakes[s];
            snakeBite.play();
            console.log('snake b')
          }
        }
        let origin_b = document.getElementById("playingBoardCell" + ba);
        console.log(b+ "+" + randomNumber + "="+ba+"blue");
        gotti_b = document.createElement("div");

        gotti_b.classList.add("got_b");
        origin_b.appendChild(gotti_b);
       // b = b + randomNumber;
       b=ba;
      }
    } else {
      if ((r == 1 && randomNumber != 1) || r + randomNumber > 100) {
      } else {
        const removeG = document.querySelector(".got_r");
        if (removeG) {
          gotiMove.play();
          removeG.remove();
        }
        //add kar rhe hai

        let ra = r + randomNumber;
        for (let m in ladders) {
          if (ra == m) {
            
            ra = ladders[m];
            ladderClimbe.play();
            console.log('ladder r');
          }
        }
        for (let n in snakes) {
          if (ra == n) {
            
            ra = snakes[n];
            snakeBite.play();
            console.log('snake r')
          }
        }

        let origin_r = document.getElementById("playingBoardCell" + ra);
        console.log(r+ "+" + randomNumber + "="+ra+"red");
        gotti_r = document.createElement("div");

        gotti_r.classList.add("got_r");
        origin_r.appendChild(gotti_r);
        //r = r + randomNumber;
        r=ra;
      }
    }
    if(b==100 || r==100)
    congrates.play();
    if (b == 100) alert("Blue wins");
    if (r == 100) alert("Red wins");
  });
}
rolling();
