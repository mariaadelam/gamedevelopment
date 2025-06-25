let xMoves = true; // true = X's turn, false = O's turn
// const cells = document.querySelectorAll('td');

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
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (event) {
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

      xMoves = !xMoves; // schimba tura
      cell.dataset.active = false; // dezactiveaza celula
      someoneWon(); // verifica daca cineva a castigat

      //pt a nu mai da click pe aceeasi celula
      // cell.removeEventListener('click', arguments.callee); // remove the event listener



    });
  }
}

function someoneWon() {

  const cells = document.querySelectorAll('td');
  console.log(cells);
  //Todo: check lines
  for (let i = 0; i < 3; i++) { //todo: read board size instead of 3
    //check line 1

    const firstCell = i*3 + 0;
    const secondCell = i*3 + 1;
    const thirdCell = i*3 + 2;
    if(cells[firstCell].innerText === '' ||
       cells[secondCell].innerText === '' ||
       cells[thirdCell].innerText === '') {
      continue; // daca celula e goala, trece la urmatoarea linie
    }
    if(cells[firstCell].innerText === cells[secondCell].innerText &&
       cells[secondCell].innerText == cells[thirdCell].innerText ){
      console.log(`linia ${i} a castigat!`);
      return true;;
    }
    //i, j => k [0; 8]
    //linia 0: 0, 1, 2
    //linia 1: 3, 4, 5
    //linia 2: 6, 7, 8

    //col = i*3+j;
  }
  //check columns

  //check diagonals


}