let buttons = document.querySelectorAll(".button"); 
console.log(buttons);

let p = document.querySelector("p");
console.log(p);
let resetBtn = document.querySelector("#resetbtn");

let onturns = "X"; // Track the current player
let gameOver = false; // Flag to stop the game after a winner is found

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (gameOver) return; // Stop if game is over

        if (onturns === "X") {
            button.innerText = onturns;
            button.classList.add("x");
            onturns = "O";
        } else {
            button.innerText = onturns;
            button.classList.add("o");
            onturns = "X";
        }
        button.disabled = true;
        
        let winner = checkWinner();
        if (winner) {
            p.innerText = "THE WINNER IS " + winner; // Display winner once
            gameOver = true; // Set game over flag
        }
        else{
            checkDraw()
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = buttons[pattern[0]].innerText;
        let pos2 = buttons[pattern[1]].innerText;
        let pos3 = buttons[pattern[2]].innerText;
        
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner:", pos1);
                return pos1;
            }
        }
    }
    return null;
};

const checkDraw = () => {
    if ([...buttons].every(button => button.innerText !== "") && !gameOver) {
        p.innerText = "It's a Draw!";
        gameOver = true;
    }
};

resetBtn.addEventListener("click", () => {
    location.reload();
});
