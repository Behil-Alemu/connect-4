/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
// width is x 
// height is y 
// it is looping though height 6 times and push { length: WIDTH } which is turned in to an array but where did the { length: WIDTH } come from. is that not used to get value from an object? 

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */
//<table id="board">
//<tr id="column-top"> <td id = x>  </td> </tr>
//</table>



function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board')

  // TODO: add comment for this code. we will create a table row element that has the id "column-top". Next we add an EventListener that will listen to a click which will run the function "handleClick" will be down there. 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

// in the array borad there are 6 arrays (HEIGHT) in each array as there is 7 iteams (WIDTH)
// Table Data Cell td wiil be with tr. looping thought the width we will create td. the td created will be set to x 
// what is width right here, 7? is it looping 7 times and adding td 7 times ?
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // until y is 6 it will loop thought HEIGHT (which is 6 right now) and creates 6 different tr. then for each tr x will loop thought 7 times and create a td. cell is attached to the row. <tr > (7x from 0 to 6)<td id = y-x>  </td> </tr>. 
  // TODO: add comment for this code. 
  //cell.setAttribute("id", `${y}-${x}`); is it setting the td  to y and x ? what is the value of y and x right here ?
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x (WIDTH td), return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0. 
  //How do I go about it ?
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
  // return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell, accepting y and x, thought y and x need to be attached to the td, so append the div to a td. 
  // how do i know which td to append to ?
  const cellTaken = document.createElement('div')
  cellTaken.classList.add('piece');
  cellTaken.classList.add(`p${currPlayer}`);
  cellTaken.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  // do i need to write the message ?
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // what does that plus do ?

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  // board[y][x] = currPlayer; how can this = to currPlayer ? from the array board get the y and x 
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame. .every returns a Boolean value
 if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  // if the current player is 1 then make it player 2 if not then make it player 1. 
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
