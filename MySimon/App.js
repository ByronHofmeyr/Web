// This class requires an update(), render() and
// a handleInput() method.
/*
 *  The Player function, which initiates the Player by:
    Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
    Setting the Player initial location
    The update method for the Player (can be similar to the one for the Enemy)
    The render method for the Player (use the code from the render method for the Enemy)
    The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
    Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
    Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
    If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
    You can add your own Player methods as needed.
 */

var Player = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    console.log("Player");
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 5;
    //this.speed = 10;

};
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log("Player.prototype.update");
};

// Handles collision with the Enemy
Player.prototype.collision = function () {
    console.log("Player.prototype.collision");

};
// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    //console.log("Player.prototype.render");
    //ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};
// Handle Input to move player
Player.prototype.handleInput = function (keyCode) {
    /*
     * The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
       Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
       Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
       If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
     */
    console.log("Player.prototype.handleInput");
    console.log("keyCode = ", keyCode);
    switch (keyCode) {
        case 'left':
            if (this.x > 0) { this.x--; }
            break;
        case 'up':
            if (this.y > 0) { this.y--; }
            break;
        case 'right':
            if (this.x < 4) { this.x++; }
            break;
        case 'down':
            if (this.y < 5) { this.y++; }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
console.log("instantiate your objects");
var amy = new Player();
amy.y = 1;
amy.speed = 100;
    

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// This is the starting point and is called from HTML onload
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = (duration) =>
    new Promise(resolve => setTimeout(resolve, duration));

async function addQuadrant() {
    var randomInt = getRandomInt(0, 3);
    console.log("randomInt = ", randomInt);
    // Light colour and play sound
    states[randomInt] = true;
    //console.log("states = ", states);
    //setTimeout(function () {
    await delay(1000);
        states[randomInt] = false;
        computerSequence.push(randomInt);
        console.log("computerSequence = ", computerSequence);
        playerTurn = true;
        //return true;
    //}, 1000); // How long do you want the delay to be (in milliseconds)?
}

async function playComputerSequence(counter) {
    if (counter < computerSequence.length) {
        //setTimeout(function () {
        await delay(300);
            states[computerSequence[counter]] = true;
            console.log("states[computerSequence[counter]]: ", states);
            //setTimeout(function () {
        await delay(1000);
                console.log("The index of this number is: " + counter);
                states[computerSequence[counter]] = false;
                console.log("states: ", states);
                counter++;
                playComputerSequence(counter);
            //}, 1000);
        //}, 300);
    } else {
        //setTimeout(function () {
            //return true;
        await delay(300);
            addQuadrant();
        //}, 300);
    }
    //return true;
}

function computerTurn() {
    // Add 1 to score
    score++;
    // play playedArray then add random quadrant
    playComputerSequence(0);
    //const addQuad = await addQuadrant();
    //console.log("computerTurn");
    //
}

/*
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    console.log("mouseX :",x, " mouseY :", y);
}
*/

function hasSameColor(color, quadrant) {
    //console.log("color = ", color);
    //console.log("quadrant = ", quadrant);
    return quadrant === color;
}

function compareSequence(playerSequence, computerSequence) {
    // compare the computer sequence to the player sequence
    console.log("playerSequence = ", playerSequence);
    console.log("computerSequence = ", computerSequence);
    return (playerSequence === computerSequence); 
 /*       console.log("compareSequence true ");
        return true;
    } else {
        console.log("compareSequence  false");
        return false;
    }
*/
}

function actionMouseUp(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    ctx.fillRect(235, 320, 40, 14);
    if ((x > 235 && x < 275) && (y > 329 && y < 343)) {
        // switch game on or off
        if (gameOn) {
            gameOn = false;
            strictOn = false;
            score = 0;
            states = [false, false, false, false];
            computerSequence = [];

        } else {
            gameOn = true;
        }
        console.log("gameOn = ", gameOn);
        
    }
    if ((x > 290 && x < 306) && (y > 279 && y < 295)) {
        // switch strict on or off
        if (gameOn) {
            if (strictOn) {
                strictOn = false;
            } else {
                strictOn = true;
            }
        }
        console.log("strictOn = ", strictOn);

    }
    if ((x > 243 && x < 260) && (y > 279 && y < 294)) {
        // Start game
        if (gameOn) {
            console.log("Start ");
            computerTurn();
        }
    }
    //Check for a quadrand pressed
    if (gameOn && playerTurn) {
        //console.log("Waiting for quadrant press ");
        // Check the color to find the quadrent you are in.
        // get pixel under cursor
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        
        // create rgb color for that pixel
        const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        //console.log("color ", color);
        // find a quadrent with the same colour
        var i;
        for (i = 0; i < 4; i++) {
            if (hasSameColor(color, colors[i])) {
                var selected = i;
                console.log('click on quadrant = ', selected);
                // Light colour and play sound
                states[selected] = true;
                playerTurn = false;
                //console.log("states = ", states);
                setTimeout(function () {
                    states[selected] = false;
                    playerSequence.push(selected);
                    if (!compareSequence(selected, computerSequence.slice(playerSequence.length - 1, playerSequence.length)[0])) {
                        alert("Invalid sequence, try again");
                        playerSequence = [];
                        playerTurn = true;
                    } else {
                        if (computerSequence.length === playerSequence.length) {
                            //alert("Correct, computers turn");
                            playerSequence = [];
                            computerTurn();
                        } else {
                            playerTurn = true;
                        }
                    }
                    
                }, 1000); // How long do you want the delay to be (in milliseconds)?

                
            }
        }

    }
}


console.log("instantiate your objects");
// This listens for mouse movements and sends the cordinates to

//document.addEventListener("mousemove", (function (e) { getMousePos(canvas, e); }), false);
document.addEventListener("mouseup", (function (e) { actionMouseUp(canvas, e); }), false);
        //player.handleInput(allowedKeys[e.keyCode]);
    //});

