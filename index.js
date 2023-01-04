const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "" ,""];
//options are nine because it can be any of them which are matching 
let currentPlayer = "X";
let running = false;
//set running to false initially because the game has not started

initializeGame();
//the above called function takes care of any setup before we start

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`; 
    running = true;   
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
        //if the cell is empty and the game isn't running then don't do anything
    }
    //otherwise invoke updateCell function
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer; //this line of code is used to update the placeholder
    cell.textContent = currentPlayer; //updates the text content of the current player
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false; //at first there is no winner
    for(let i = 0; i < winConditions.length; i++){ //for loop is used to iterate the win conditions
        const condition = winConditions[i]; //stores each of the arrays within this temporary variable
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        //cell A, B, C are the indices of each condition
        if(cellA == "" || cellB == "" || cellC == ""){
            continue; //if there is an empty space we will continue and skip this iteration
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true; //there is a winner
            break; //if there is a winner we will stop
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false; //running is now false because the game is over
    }
    else if(!options.includes("")){ //if option does not include an empty space
        statusText.textContent = "Draw!";
        running = false; //the game is over
    }
    else{
        changePlayer(); //if X has not won O will take over 
    }
}
function restartGame(){ //works on the restart button
    currentPlayer = "X"; //weka mwenye unataka aanze game
    options = ["", "", "", "", "", "", "", "" ,""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = ""); //clears all the cells
    running = true;
}