var debug = true;
var userSymbol = "O";
var compSymbol = "X";
var yourTurn = true;


var TicTacToeObj = {
    "00": 0, "01": 0, "02": 0,
    "10": 0, "11": 0, "12": 0,
    "20": 0, "21": 0, "22": 0
};

function iWin() {
    console.log("I Win");
}

function findEmptyBlock(set) {
    for (var x = 0; x < 3; x++) {
        // check the diagonals here
        if (set == 7 && TicTacToeObj[x.toString() + x.toString()] == 0) {
            return (x.toString() + x.toString());
        } else {
            if (set == 8 && TicTacToeObj[x.toString() + (2 - x).toString()] == 0) {
                return (x.toString() + (2 - x).toString());
            }
        }
        for (var y = 0; y < 3; y++) {
            // check rows and columns
            if (set == x && TicTacToeObj[x.toString() + y.toString()] == 0) {
                return (x.toString() + y.toString());
            } else {
                if (set == (y + 4) && TicTacToeObj[y.toString() + x.toString()] == 0) {
                    return (y.toString() + x.toString());
                }
            }
        }
    }
}

function decideMove(scoresObj) {
    var winSet = false;    
    var moveSet = false;   
    for (var value in scoresObj) {
        if (scoresObj.hasOwnProperty(value)) {
            if (debug) { console.log("value = ", value) };
            if (value = -2) {
                winSet = scoreObj.hasOwnProperty(key);
            } else {
                if (value = 2) {
                    moveSet = scoreObj.hasOwnProperty(key);
                }
            }
        }
    }
    if (winSet) {
        emptyBlock = findEmptyBlock(winSet);
        fillBox(emptyBlock, compSymbol);
        iWin();
        return;
    } else {
        if (moveSet) {
            emptyBlock = findEmptyBlock(moveSett);
            fillBox(emptyBlock, compSymbol);
            return;
        }
    }


    if (TicTacToeObj["11"] == 0)
        fillBox("11", compSymbol);
    else {
        fillBox("01", compSymbol);
    }

}

function computersTurn() {
    // I assign 1 to the TicTacToeObj for a players mark, and -1 for
    // a computer mark.
    // I then score each row, then each column, then each diagonal.
    // If I find a score of 2 I need to play in that row, column, 
    // or diagonal.
    // If I find a score of -2 I need to play that row to win the game.

    var scoresObj = {
        0: 0, 1: 0, 2: 0,
        3: 0, 4: 0, 5: 0,
        6: 0, 7: 0, 8: 0
    };

    if (debug) { console.log("computersTurn()") };
    var scoreRow = 0;
    var scoreCol = 0;
    var scoreDiag1 = 0;
    var scoreDiag2 = 0;
//    var emptyRow = "";
//    var emptyCol = "";
//    var emptyDiag1 = "";
//    var emptyDiag2 = "";

    for (var x = 0; x < 3; x++) {
        //if (debug) {console.log("x = ", x) };
        // could check the diagonals here
        if (TicTacToeObj[x.toString() + x.toString()] == 0) {
            // score Diagonal 1
//            emptyDiag1 = (x.toString() + x.toString());
        } else {
            scoreDiag1 += TicTacToeObj[x.toString() + x.toString()];
        }

        if (TicTacToeObj[x.toString() + (2 - x).toString()] == 0) {
            // score Diagonal 2
 //           emptyDiag2 = (x.toString() + (2 - x).toString());
        } else {
            scoreDiag2 += TicTacToeObj[x.toString() + (2 - x).toString()];
        }

        for (var y = 0; y < 3; y++) {
            //if (debug) {console.log("y = ", y) };
            //if (debug) {console.log("x.toString() + y.toString() = ", (x.toString() + y.toString())) };
            //if (debug) {console.log("TicTacToeObj[x.toString() + y.toString()] = ", TicTacToeObj[x.toString() + y.toString()]) };
            if (TicTacToeObj[x.toString() + y.toString()] == 0) {
                // score Rows
//                emptyRow = (x.toString() + y.toString());
            } else {
                scoreRow += TicTacToeObj[x.toString() + y.toString()];
            }
            if (TicTacToeObj[y.toString() + x.toString()] == 0) {
                // score Columns
//                emptyCol = (y.toString() + x.toString());
            } else {
                scoreCol += TicTacToeObj[y.toString() + x.toString()];
            }
        }
        scoresObj[x] = scoreRow;
        scoresObj[x+3] = scoreCol;


        scoreRow = 0;  // Initialise scoreRow before scoring next row.
        scoreCol = 0;  // Initialise scoreCol before scoring next col.

    }

    scoresObj[7] = scoreDiag1;
    scoresObj[8] = scoreDiag2;

    decideMove(scoresObj);
    yourTurn = true;
}

function choice(button) {
    //$("#choice").on('click',function(button){
    var x = button.id;
    if (debug) { console.log("choice = ", x); }
    if (x == "X") {
        userSymbol = "X";
        compSymbol = "O";
    }
    $("#splash").attr("style", "display:none");
    $("#post-splash").attr("style", "");
}

function fillBox(button, symbol) {
    if (debug) { console.log("button clicked = ", button); };
    document.getElementById(button).innerText = symbol;
    if (symbol === userSymbol) {
        TicTacToeObj[button] = 1;
    } else {
        TicTacToeObj[button] = -1;
    }
    if (debug) { console.log("TicTacToeObj = ", TicTacToeObj); };
}

function clearBox(id) {
    if (debug) { console.log("button to clear = ", id); };
    document.getElementById(id).innerText = "";
}

function clearAllBoxes() {
    TicTacToeObj = {
        "00": 0, "01": 0, "02": 0,
        "10": 0, "11": 0, "12": 0,
        "20": 0, "21": 0, "22": 0
    };

    for (var key in TicTacToeObj) {
        if (TicTacToeObj.hasOwnProperty(key)) {
            clearBox(key);
        }
    }
}

function onClick(button) {
    var x = button.id;
    if (yourTurn) {
        fillBox(x, userSymbol);
        yourTurn = false;
        computersTurn();
    }
}

$(document).ready(function () {

    reset.addEventListener('click', function () {
        if (debug) { console.log("click reset"); }
        clearAllBoxes();
        yourTurn = true;
    });

}); 