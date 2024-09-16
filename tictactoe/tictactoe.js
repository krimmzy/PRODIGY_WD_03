const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const player1ScoreElem = document.getElementById('player1Score');
const player2ScoreElem = document.getElementById('player2Score');
const resetButton = document.getElementById('resetGame');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let player1Score = 0;
let player2Score = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        updateScores();
        status.textContent = `${currentPlayer} Wins!`;
        return;
    }

    if (board.every(cell => cell)) {
        status.textContent = "It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateScores() {
    if (currentPlayer === 'X') {
        player1Score++;
        player1ScoreElem.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreElem.textContent = player2Score;
    }

    if (player1Score === 3) {
        alert('Player 1 Wins the Series!');
        resetGame(true);
    } else if (player2Score === 3) {
        alert('Player 2 Wins the Series!');
        resetGame(true);
    }
}

function resetGame(resetScores = false) {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `${currentPlayer}'s Turn`;

    if (resetScores) {
        player1Score = 0;
        player2Score = 0;
        player1ScoreElem.textContent = player1Score;
        player2ScoreElem.textContent = player2Score;
    }
}
