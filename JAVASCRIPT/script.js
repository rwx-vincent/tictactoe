// console.log("Tic Tac Toe")

// Declaring Variables for Audio
let xsound = new Audio("./SOUNDS/x-sound.wav")
let osound = new Audio("./SOUNDS/o-sound.wav")
let win = new Audio("./SOUNDS/win.wav")
let draw = new Audio("./SOUNDS/draw.wav")
let resetsound = new Audio("./SOUNDS/reset.wav")

// Declaring Variables for turn and board
let turn = "X"
let isgameover = false;
let wintime = 1
let n = 0;
let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];


// Function to Change the Turn
const changeTurn = () => {
    // Using The conditional (ternary) operator
    return turn === "X" ? "O" : "X"
}


// Function to Check Win
const checkWin = () => {
    //boxtexts
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    wins.forEach(e => {
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            if (wintime == 1) {
                document.querySelector(".info").innerText = boxtext[e[0]].innerText + " has WON!";
                setTimeout(() => win.play(), 700) // Win Sound
                document.querySelector('.winner').getElementsByTagName('span')[0].innerText = "Congratulations " + boxtext[e[0]].innerText;

                document.getElementsByClassName('array')[0].innerText = "Matched Squares: [" + (e[0]+1) + "-" + (e[1]+1) + "-" + (e[2]+1) + "]";
            }
            wintime++;
            isgameover = true;
        }
    })
    
    board[n] = turn;
    n++;
    if ((!board.includes("-")) && (isgameover == false)){
        draw.play();  
        document.querySelector('.winner').getElementsByTagName('span')[0].innerText = "Draw!";

    }
}
    

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    // console.log(boxtext)
    element.addEventListener('click', () => {
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            boxtext.innerText === "X" ? xsound.play() : osound.play(); // Music Play
            console.log(boxtext.innerText)
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn; 
            }
            if ((!isgameover) && (!board.includes("-"))) {
                document.getElementsByClassName("info")[0].innerText = "Draw!";
            }

        }
    })
})


// Add Onclick Listener to Reset Button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    resetsound.play();
    turn = "X";
    isgameover = false;
    wintime = 1
    n = 0;
    board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.winner').getElementsByTagName('span')[0].innerText = "";
    document.getElementsByClassName('array')[0].innerText = "";
 })
