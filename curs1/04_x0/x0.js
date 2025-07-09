let xMoves = true; // true = X's turn, false = O's turn
// const cells = document.querySelectorAll('td');
let gameOver = false; // flag to check if the game is over
const DEBUGGING = true; // set to true to enable debugging logs

// function debug(MESSAGE) {
//   if (DEBUGGING == false) return;
  
//     console.log(MESSAGE);
 
// }

function debug(MESSAGE) {
  if (DEBUGGING == false) {
    console.log(MESSAGE);

  }
}

function drawBoard(selector, size = 3) {
  const board = document.querySelector(selector);
  for (let i = 0; i < size; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('td');
      cell.dataset.row = i; // setAttribute('data-row',i);
      cell.dataset.col = j; // setAttribute('data-col',j);
      cell.dataset.active = 'da'; // setAttribute('data-active',true);

      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function registerEvents() {
  const cells = document.querySelectorAll('td');

  console.log(cells); //TODO: make it depend on #game

  const elemtLaMutare = document.getElementById('la-mutare');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (event) {
      if (gameOver) return; // daca jocul s-a terminat, nu mai permite click
        
      
      const cell = event.target;
      if (cell.dataset.active != 'da') return;

      console.log(cell.dataset);
      // console.log(`ai dat click pe ${i}`);
      //template literals `` sau interpolare ${}
      // if (xMoves) {
      //   cell.innerText = 'X';
      //   xMoves = false;
      // } else {
      // cell.innerText = '0';
      // xMoves = true;
      // }

      //echivalent if ternar
      cell.innerText = xMoves ? 'X' : 'O';

      someoneWon(); // verifica daca cineva a castigat
      xMoves = !xMoves; // schimba tura
      elemtLaMutare.innerText = xMoves ? 'X' : 'O'; // actualizeaza textul din span
    
      cell.dataset.active = false; // dezactiveaza celula
      

      //pt a nu mai da click pe aceeasi celula
      // cell.removeEventListener('click', arguments.callee); // remove the event listener



    });
  }
}

function someoneWon() {

  const cells = document.querySelectorAll('td');
  // console.log(cells);
  //Todo: check lines
  for (let i = 0; i < 3; i++) { //todo: read board size instead of 3
    //check line 1

    const firstCell = i*3 + 0;
    const secondCell = i*3 + 1;
    const thirdCell = i*3 + 2;

   
   let lineIsIdentical = checkThreeCells(cells, firstCell, secondCell, thirdCell, 'linia', i);
   if (lineIsIdentical) {
      gameOver = true;
      addGameOverClass(); // adauga clasa 'over' la elementul cu id 'game'
      return; // daca s-a gasit o linie castigatoare, iesim din functie
    }
    //i, j => k [0; 8]
    //linia 0: 0, 1, 2
    //linia 1: 3, 4, 5
    //linia 2: 6, 7, 8

    //col = i*3+j;

      //check columns

    for (let j = 0; j < 3; j++) {
      const firstCell = j+0*3;
      const secondCell = j  + 1*3;
      const thirdCell = j + 2*3;


      /* col 0: 0,3,6
      col 1: 1, 4, 7
      col 2: 2, 5, 8

      col j = 1;
      firstCell(1) = j + 0*3 =1
      secondCell(4) = j + 1*3  = 4
      thirdCell(7) = j + 2*3  = 7

      col j = 2;
      firstCell(2) = j + 0*3 =2+0*3=2
      secondCell(5) = j + 1*3  =2 + 1*3= 5
      thirdCell(8) = j + 2*3  =2 + 2*3= 8 */
      debug(`verific coloana ${j} adica celulele ${firstCell}, ${secondCell} si ${thirdCell}`);
      let columnIsIdentical =checkThreeCells(cells, firstCell, secondCell, thirdCell, 'coloana', j);

    if (columnIsIdentical) {
      gameOver = true;
      addGameOverClass();
      return;
    }
  }
}


  //check main diagonal

  //0,4,8
  let firstCell =0;
  let secondCell = 4;
  let thirdCell = 8;
  let diagonalIsIdentical = checkThreeCells(cells, firstCell, secondCell, thirdCell, 'diagonala', 'principala');
 

   if (diagonalIsIdentical) {
      gameOver = true;
      addGameOverClass(); // adauga clasa 'over' la elementul cu id 'game'
      return;
    }
  //variabilele pot fi o data string si odata number
  /* pt param indice odata il apelej cu i si j si odata cu string 'principala' si secundara */


  //check secondary diagonal
  //2,4,6
   firstCell =2;
   secondCell = 4;
   thirdCell = 6;
   let secondaryIsIdentical = checkThreeCells(cells, firstCell, secondCell, thirdCell, 'diagonala', 'secundara');

   if (secondaryIsIdentical) {
      gameOver = true;
      addGameOverClass(); // adauga clasa 'over' la elementul cu id 'game'
      
    }

    function addGameOverClass() {
      const elemGame = document.getElementById('game');
      elemGame.classList.add('over'); // adauga clasa 'over' la elementul cu id 'game'

    }
}

function checkThreeCells(cells, firstCell, secondCell, thirdCell, directie, indice) {
  if (cells[firstCell].innerText === '' ||
    cells[secondCell].innerText === '' ||
    cells[thirdCell].innerText === '') {
    return false; // daca celula e goala, trece la urmatoarea linie
  }
  if (cells[firstCell].innerText === cells[secondCell].innerText &&
    cells[secondCell].innerText == cells[thirdCell].innerText) {
    debug(` ${directie} ${indice} e castigatoare!`);
    alert(` ${xMoves ? 'X' : 'O'} won!`);
    return true;
  }
}
 

 