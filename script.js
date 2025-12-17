let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;
let playWithAI = false;
let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setHumanMode() {
    playWithAI = false;
    resetGame();
    document.getElementById("message").innerText = "Human vs Human Mode";
}

function setAIMode() {
    playWithAI = true;
    resetGame();
    document.getElementById("message").innerText = "Human vs AI Mode";
}

function playMove(index) {

    if (board[index] !== "" || !gameRunning) return;

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    checkWinner();

    if (!gameRunning) return;

    if (playWithAI) {
        currentPlayer = "O";
        setTimeout(aiMove, 500);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function aiMove() {

    let emptyCells = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiChoice = emptyCells[randomIndex];

    board[aiChoice] = "O";
    document.getElementsByClassName("cell")[aiChoice].innerText = "O";

    checkWinner();

    currentPlayer = "X";
}

function checkWinner() {

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            document.getElementById("message").innerText =
                "Player " + board[a] + " Wins!";
            gameRunning = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("message").innerText = "Game Draw!";
        gameRunning = false;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameRunning = true;

    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
    }
}
