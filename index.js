const Gameboard = (function(){
    let board = ['', '', '', '', '', '', '', '', ''];

    return{
        getBoard(){
            return board;
        },
        logBoard(){
            for (let i = 0; i < board.length; i += 3){
                console.log(board.slice(i, i + 3).join(' | '));
            }
        },
        resetBoard(){
            board = ['', '', '', '', '', '', '', '', ''];
        }
    };
})();

function Player(name, marker){
    return{
        name,
        marker,
        logPlayer(){
            console.log(`Player: ${name} Marker: ${marker}`);
        }
    };
}

const GameController = (function(){
    let player1, player2;
    let currentPlayer;

    function switchTurn(){
        currentPlayer = currentPlayer === player1? player2 : player1;
        DisplayController.updateMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    }

    function resetPlayers(name1, name2) {
        player1 = Player(name1, 'O');
        player2 = Player(name2, 'X');
        currentPlayer = player1;
        DisplayController.updateMessage(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
    }

    return{
        playTurn(index){
            const board = Gameboard.getBoard();
            if(board[index] === ''){
                board[index] =  currentPlayer.marker;
                
                if(GameController.checkWin()){
                    DisplayController.updateMessage(`${currentPlayer.name} wins!`);
                }
                else if(GameController.checkTie()){
                    DisplayController.updateMessage(`It's a tie!`);
                }
                else {
                    switchTurn();
                }
            }
            else{
                console.log('Spot already filled!');
            }
        },
        printBoard(){
            Gameboard.logBoard();
        },
        getCurrentPlayer(){
            return currentPlayer;
        },
        checkWin(){
            const board = Gameboard.getBoard();
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for(const condition of winConditions){
                const [a, b, c] = condition;
                if (
                    board[a] !== '' &&
                    board[a] === board[b] &&
                    board[a] === board[c]
                ){
                    return true;
                }
            }
            return false;
        },
        checkTie(){
            const board = Gameboard.getBoard();
            const isBoardFull = board.every(cell => cell !== '');
            return isBoardFull && !GameController.checkWin();
        },
        resetGame(){
            const board = Gameboard.getBoard();
            for(let i = 0; i < board.length; i++){
                board[i] = '';
            }
            currentPlayer = player1;
        },
        startNewGame(name1, name2) {
            Gameboard.resetBoard();
            resetPlayers(name1, name2);
            DisplayController.renderBoard();
        }
    };
})();

const DisplayController = (function(){
    return{
        renderBoard(){
            const displayBoard = document.getElementById('displayBoard');
            displayBoard.innerHTML = '';
            
            const board = Gameboard.getBoard();
            board.forEach((cell, index) => {
                const div = document.createElement('div');
                div.classList.add('cell');
                div.innerText = cell;
                div.addEventListener('click', () => {
                    GameController.playTurn(index);
                    DisplayController.renderBoard();
                });
                displayBoard.appendChild(div);
            });
        },
        updateMessage(text){
            document.getElementById('message').textContent = text;
        }
    };
})();

const startBtn = document.querySelector('#startBtn');
startBtn.addEventListener('click', () => DisplayController.renderBoard());

document.getElementById('startBtn').addEventListener('click', () => {
    const name1 = prompt('Enter name for Player 1 (O):') || 'Player 1';
    const name2 = prompt('Enter name for Player 2 (X):') || 'Player 2';
    GameController.startNewGame(name1, name2);
});
