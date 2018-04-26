var debug = true;
var userSymbol = "O";
var compSymbol = "X";
var yourTurn = true;


var TicTacToeObj = {
    "00": 0, "01": 0, "02": 0,
    "10": 0, "11": 0, "12": 0,
    "20": 0, "21": 0, "22": 0
};

var scoresObj = {
    0: 0, 1: 0, 2: 0,
    3: 0, 4: 0, 5: 0,
    6: 0, 7: 0,
};

function iWin() {
    console.log("I Win");
}

function findEmptyBlock(set) {
    if (debug) { console.log("findEmptyBlock Function"); }
    if (debug) { console.log("set = ", set); }
    for (var x = 0; x < 3; x++) {
        // check the diagonals here
        if (set == 6 && TicTacToeObj[x.toString() + x.toString()] == 0) {
            if (debug) { console.log("set 6"); }
            return (x.toString() + x.toString());
        } else {
            if (set == 7 && TicTacToeObj[x.toString() + (2 - x).toString()] == 0) {
                if (debug) { console.log("set 7"); }
                return (x.toString() + (2 - x).toString());
            }
        }
        for (var y = 0; y < 3; y++) {
            // check rows and columns
            if (set == x && TicTacToeObj[x.toString() + y.toString()] == 0) {
                if (debug) { console.log("Rows"); }
                return (x.toString() + y.toString());
            } 
            if (set == (x + 3) && TicTacToeObj[y.toString() + x.toString()] == 0) {
                if (debug) { console.log("columns"); }
                if (debug) { console.log("(y + 3) = ", (y + 3)); }
                if (debug) { console.log("x = ", x); }
                if (debug) { console.log("y.toString() + x.toString() = ", y.toString() + x.toString()); }
                return (y.toString() + x.toString());
            }
        }
    }
    return false;
}

function decideMove() {
    if (debug) { console.log("decideMove Function"); }
    var winSet = -1;    
    var moveSet = -1;
    var value
    if (debug) { console.log("scoresObj = ", scoresObj); }
    for (var key in scoresObj) {
        value = scoresObj[key]; 
        if (debug) { console.log("key = ", key); }
        if (debug) { console.log("value = ", value) };
        if (value == -2) {
            winSet = key;
            if (debug) { console.log("winSet = ", winSet); }
            break;
        } else {
            if (value == 2) {
                moveSet = key;
                if (debug) { console.log("moveSet = ", moveSet); }
                break;
            }
        }
    }
    if (winSet > -1) {
        if (debug) { console.log("winSet = ", winSet); }
        emptyBlock = findEmptyBlock(winSet);
        if (debug) { console.log("emptyBlock = ", emptyBlock); }
        fillBox(emptyBlock, compSymbol);
        iWin();
        return;
    } else {
        if (moveSet > -1) {
            if (debug) { console.log("moveSet = ", moveSet); }
            emptyBlock = findEmptyBlock(moveSet);
            if (debug) { console.log("emptyBlock = ", emptyBlock); }
            if (emptyBlock) { fillBox(emptyBlock, compSymbol); }
            return;
        }
    }

    if (TicTacToeObj["11"] == 0)
        fillBox("11", compSymbol);
    else {
        emptyBlock = findEmptyBlock(0);
        if (emptyBlock) {
            fillBox(emptyBlock, compSymbol);
        } else {
            emptyBlock = findEmptyBlock(1);
            if (emptyBlock) {
                fillBox(emptyBlock, compSymbol);
            }
            else {
                emptyBlock = findEmptyBlock(2);
                if (emptyBlock) {
                    fillBox(emptyBlock, compSymbol);
                }
            }
        }
    }

}

function computersTurn() {
    if (debug) { console.log("computersTurn Function"); }
    // I assign 1 to the TicTacToeObj for a players mark, and -1 for
    // a computer mark.
    // I then score each row, then each column, then each diagonal.
    // If I find a score of 2 I need to play in that row, column, 
    // or diagonal.
    // If I find a score of -2 I need to play that row to win the game.

    scoresObj = {
        0: 0, 1: 0, 2: 0,
        3: 0, 4: 0, 5: 0,
        6: 0, 7: 0
    };

    if (debug) { console.log("computersTurn()") };
    var scoreRow = 0;
    var scoreCol = 0;
    var scoreDiag1 = 0;
    var scoreDiag2 = 0;

    for (var x = 0; x < 3; x++) {
        //if (debug) {console.log("x = ", x) };
        // could check the diagonals here
        scoreDiag1 += TicTacToeObj[x.toString() + x.toString()];
        // score Diagonal 2
        scoreDiag2 += TicTacToeObj[x.toString() + (2 - x).toString()];

        for (var y = 0; y < 3; y++) {
            // score Rows
            scoreRow += TicTacToeObj[x.toString() + y.toString()];
            // score Columns
            scoreCol += TicTacToeObj[y.toString() + x.toString()];
        }
        scoresObj[x] = scoreRow;
        scoresObj[x+3] = scoreCol;

        scoreRow = 0;  // Initialise scoreRow before scoring next row.
        scoreCol = 0;  // Initialise scoreCol before scoring next col.
    }

    scoresObj[6] = scoreDiag1;
    scoresObj[7] = scoreDiag2;
    if (debug) { console.log("scoresObj = ", scoresObj) };
    decideMove();
    yourTurn = true;
}

function choice(button) {
    if (debug) { console.log("choice Function"); }
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
    if (debug) { console.log("fillBox function") };
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
    if (debug) { console.log("clearAllBoxes function") };
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
    if (debug) { console.log("onClick function") };
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