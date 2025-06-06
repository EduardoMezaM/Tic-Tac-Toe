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