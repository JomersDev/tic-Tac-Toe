//Player factory function
const createPlayer = (name, mark) => {
    return {name, mark};
  }

//creating gameBoard moudle
const gameBoard = (() => {
    //creating gameboard array
    const board = ["", "", "", "", "", "", "", "", ""];
    //selecting gameboard container from DOM
    let boardArray = document.querySelector(".gameboard-container");
    //assigning a div for each index in the array
    board.forEach((item, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = board[index];

        //adding event listeners to each div so players can add marks
        cell.addEventListener('click', placeMark, {once : true});
        //checks what turn it currently is and uses this to place the correct mark ("X" on odds, "O" on evens)
        function placeMark() {
            if (gameLogic.turnCount % 2 == 0) {
                //updates board array with the correct player mark
                board[index] = gameLogic.player2.mark;
                //updates cell div to display the mark corresponding to the array index
                cell.textContent = board[index];
                //access checkWin fucntion to determine if there has been a winner
                gameLogic.checkWin();
                //once turn count reaches 9 the game is deemed a draw
                if (gameLogic.turnCount == 9) {
                    const display = document.getElementById("display");
                    const drawMessage = document.createElement("p");
                    drawMessage.textContent = "It's a draw!";
                    display.appendChild(drawMessage);
                }
                gameLogic.turnCount++;
            } else {
                board[index] = gameLogic.player1.mark;
                cell.textContent = board[index];
                gameLogic.checkWin();
                if (gameLogic.turnCount == 9) {
                    const display = document.getElementById("display");
                    const drawMessage = document.createElement("p");
                    drawMessage.textContent = "It's a draw!";
                    display.appendChild(drawMessage);
                }
                gameLogic.turnCount++;
            }
        }
        boardArray.appendChild(cell);
    })

  return {
    board
  };
})();

const gameLogic = (() => {
    //declaring players
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

    //turn count variable
    let turnCount = 1;

    //all possible winning combinations
    const winningValues = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    //reset button implementation
    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener('click', resetGame);
    function resetGame(){
        window.location.reload();
    }

    function checkWin(){
        //creating variables for display elements
        const display = document.getElementById("display");
        const winMessage = document.createElement("p");

        //checking win conditons for both players
        for (let i = 0; i <= gameLogic.winningValues.length - 1; i++) {
            if (gameBoard.board[winningValues[i][0]] == player1.mark && gameBoard.board[winningValues[i][1]] == player1.mark && gameBoard.board[winningValues[i][2]] == player1.mark) {
                //displaying a message for the player that won
                winMessage.textContent = "Player 1 Wins!";
                display.appendChild(winMessage);
                //disable user input once a winner has been established
                var gameBoardElement = document.querySelector(".gameboard-container");
                gameBoardElement.style["pointer-events"] = "none";
            } else if (gameBoard.board[winningValues[i][0]] == player2.mark && gameBoard.board[winningValues[i][1]] == player2.mark && gameBoard.board[winningValues[i][2]] == player2.mark) {
                winMessage.textContent = "Player 2 Wins!";
                display.appendChild(winMessage);
                var gameBoardElement = document.querySelector(".gameboard-container");
                gameBoardElement.style["pointer-events"] = "none";
            } 
        }
    }
    return {
        turnCount,
        player1,
        player2,
        winningValues,
        checkWin
    };
})();


