const boardDiv = document.querySelector('#board');
let gameStart = false;
let countEvolution = 0;
let timeoutId;

let board = [
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','']
];


function renderBoard(speed) {
  boardDiv.innerHTML = '';
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.row = i;
      cellDiv.dataset.col = j;
      if (cell === 'x') {
        cellDiv.classList.add('fill');
      }
      if(!gameStart) {
        cellDiv.addEventListener('click', () => {
          if(board[i][j] === 'x') {
            board[i][j] = '';
          } else {
            board[i][j] = 'x';
          };
          renderBoard();
        });
      }
      boardDiv.appendChild(cellDiv);
    };
  };
  if(gameStart) {
    const allCellsEmpty = board.every(row => row.every(cell => cell === ''));
    if (allCellsEmpty) {
      alert('Game Over');
      end();
      return;
    }

    if(speed === undefined) speed = 1000;

    timeoutId = setTimeout(() => {
      rules();
    }, speed);
  };
};

function rules(){
  countEvolution++;
  document.querySelector('#counter').textContent = `Evolutions: ${countEvolution}`;
  let nextBoard = JSON.parse(JSON.stringify(board));
  for(let row = 0; row < board.length; row++){
    for(let coll = 0; coll < board[row].length; coll++){
      let adjacents = 0;
      if(board[row][coll-1] === 'x') adjacents++;
      if(board[row][coll+1] === 'x') adjacents++;
      if(board[row-1] && board[row-1][coll] === 'x') adjacents++;
      if(board[row+1] && board[row+1][coll] === 'x') adjacents++;
      if(board[row-1] && board[row-1][coll-1] === 'x') adjacents++;
      if(board[row-1] && board[row-1][coll+1] === 'x') adjacents++;
      if(board[row+1] && board[row+1][coll-1] === 'x') adjacents++;
      if(board[row+1] && board[row+1][coll+1] === 'x') adjacents++;

      if(board[row][coll] === 'x') {
        // Rule 1
        if(adjacents < 2) nextBoard[row][coll] = '';
        // Rule 2
        else if(adjacents > 3) nextBoard[row][coll] = '';
      } else {
        // Rule 3
        if(adjacents === 3) nextBoard[row][coll] = 'x';
      }
    }
  }
  board = nextBoard;
  renderBoard(document.querySelector('#speed').value);
}

document.querySelector('#start').addEventListener('click', () => {
  if(gameStart) return;
  gameStart = true;
  renderBoard(document.querySelector('#speed').value);
});

document.querySelector('#stop').addEventListener('click', () => {
  end();
});

function end(){
  gameStart = false;
  clearTimeout(timeoutId);
  board.forEach(row => row.fill(''));
  renderBoard();
  countEvolution = 0;
  document.querySelector('#counter').textContent = `Evolutions: ${countEvolution}`;
}

renderBoard();