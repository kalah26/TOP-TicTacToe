// Defining the game board and some basic utility functions
const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const setMark = (index, mark) => {
      if (board[index] === "") {
        board[index] = mark;
      }
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return {
      getBoard,
      setMark,
      resetBoard,
    };
  })();
  
  // Creating player object
  const Player = (name, marker) => {
    return { name, marker }; // Return an object with name and marker
  };
  
  const gameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;
  
    const startGame = (player1Name, player2Name) => {
      players = [Player(player1Name, "X"), Player(player2Name, "O")]; // Corrected player creation
      currentPlayerIndex = 0;
      isGameOver = false;
      Gameboard.resetBoard();
    };
  
    const getCurrentPlayer = () => players[currentPlayerIndex];
  
    const switchPlayer = () => {
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
  
    const playerTurn = (index) => {
      if (!isGameOver && Gameboard.getBoard()[index] === "") {
        Gameboard.setMark(index, getCurrentPlayer().marker);
        if (checkWinner()) {
          isGameOver = true;
          return `${getCurrentPlayer().name} wins the game!`;
        }
        if (isTie()) {
          isGameOver = true;
          return "It's a tie!";
        }
        switchPlayer();
      }
    };
  
    const checkWinner = () => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
      ];
  
      return winningCombinations.some((combination) =>
        combination.every(
          (index) => Gameboard.getBoard()[index] === getCurrentPlayer().marker
        )
      );
    };
  
    const isTie = () => {
      return Gameboard.getBoard().every((cell) => cell !== "");
    };
  
    return {
      startGame,
      playerTurn,
      getCurrentPlayer,
    };
  })();
  
  // Display controller for handling DOM updates
  const DisplayController = (function () {
    const gameBoardElement = document.getElementById("gameboard");
    const messageElement = document.getElementById("message");
  
    const renderBoard = () => {
      gameBoardElement.innerHTML = ""; // Clear previous content
      Gameboard.getBoard().forEach((mark, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = mark;
        cell.addEventListener("click", () => handleCellClick(index));
        gameBoardElement.appendChild(cell);
      });
    };
  
    const handleCellClick = (index) => {
      const result = gameController.playerTurn(index);
      renderBoard();
      if (result) {
        messageElement.textContent = result;
      } else {
        messageElement.textContent = `It's ${gameController.getCurrentPlayer().name}'s turn.`;
      }
    };
  
    return {
      renderBoard,
    };
  })();
  
  DisplayController.renderBoard();
  // Event listener for starting the game
  document.getElementById("startBtn").addEventListener("click", () => {
    Gameboard.resetBoard();
    const player1 = prompt("Enter Player 1's name:");
    const player2 = prompt("Enter Player 2's name:");
    gameController.startGame(player1, player2);
    document.getElementById("message").textContent = `${player1}'s turn.`;
  });
  