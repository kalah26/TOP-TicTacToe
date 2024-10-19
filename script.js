// defining the game board and some basic utility function
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] == "") {
            board[index] = mark;
        }
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return {
        getBoard,
        setMark,
        resetBoard
    };
})();

// creating player objet

const Player = (name, marker) => {
    return (name, marker);
}

const gameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;
    isGameOver = false;

    const startGame = (player1Name, player2Name) => {
        players = [Player(player1Name, "X"), Player(player2Name, ),"O"];
        currentPlayerIndex = currentPlayerIndex = 0;
        isGameOver = false;
        Gameboard.resetBoard();
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0; 
    }

    const playerTurn = (index) => {
        if (!isGameOver && Gameboard.getBoard() === "") {
            Gameboard.setMark(index, getCurrentPlayer().marker);
            if (checkWinner()) {
                isGameOver = true;
                return `${getCurrentPlayer().name} wins the game !`
            }
            if (isFinite()) {
                isGameOver = true;
                return "It's a tie"
            }
        }
        switchPlayer();
    }

    const checkWinner = () => {
        
    }
})