/////////////////////////////////////////////////////////////////////////////////////////

// This is the starting point and is called from HTML onload
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = (duration) =>
    new Promise(resolve => setTimeout(resolve, duration));

async function addQuadrant() {
    var randomInt = getRandomInt(0, 3);
    await console.log("randomInt = ", randomInt);
    // Light colour and play sound
    states[randomInt] = true;
    await delay(1000);
    states[randomInt] = false;
    await    computerSequence.push(randomInt);
    await    console.log("computerSequence = ", computerSequence);
    playerTurn = true;
}

async function playComputerSequence(counter) {
    if (counter < computerSequence.length) {
        await delay(300);
        states[computerSequence[counter]] = true;
        await console.log("states[computerSequence[counter]]: ", states);
        await delay(1000);
        await    console.log("The index of this number is: " + counter);
        states[computerSequence[counter]] = false;
        await    console.log("states: ", states);
        counter++;
        await    playComputerSequence(counter);
    } else {
        await delay(300);
    }
}

async function computerTurn() {
    // Add 1 to score
    score++;
    // play playedArray then add random quadrant
    await playComputerSequence(0);
    await delay(300);
    await addQuadrant();
    //console.log("computerTurn");
}

function hasSameColor(color, quadrant) {
    return quadrant === color;
}

function compareSequence(playerSequence, computerSequence) {
    // compare the computer sequence to the player sequence
    return playerSequence === computerSequence; 
}

async function actionMouseUp(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    ctx.fillRect(235, 320, 40, 14);
    if (x > 235 && x < 275 && y > 329 && y < 343) {
        // switch game on or off
        if (gameOn) {
            gameOn = false;
            strictOn = false;
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //should call engine reset for these three lines
            score = 0;
            states = [false, false, false, false];
            computerSequence = [];

        } else {
            gameOn = true;
        }
        console.log("gameOn = ", gameOn);
        
    }
    if (x > 290 && x < 306 && (y > 279 && y < 295)) {
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
    if (x > 243 && x < 260 && y > 279 && y < 294) {
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
                await delay(1000);
                states[selected] = false;
                playerSequence.push(selected);
                if (!compareSequence(selected, computerSequence.slice(playerSequence.length - 1, playerSequence.length)[0])) {
                    if (strictOn) {
                        // Restart game
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Engine.reset()
                        alert("Invalid sequence, start again");
                        score = 0;
                        states = [false, false, false, false];
                        computerSequence = [];
                        playerSequence = [];
                        playerTurn = false;
                        computerTurn();
                        return;
                    } else {
                        alert("Invalid sequence, try again");
                        playerSequence = [];
                        await playComputerSequence(0);
                        playerTurn = true;
                    }
                } else {
                    if (computerSequence.length === playerSequence.length) {
                        //alert("Correct, computers turn");
                        await delay(300);
                        playerSequence = [];
                        computerTurn();
                    } else {
                        playerTurn = true;
                    }
                }
            }
        }

    }
}

// This listens for mouse movements and sends the cordinates to
document.addEventListener("mouseup", function (e) { actionMouseUp(canvas, e); }, false);


