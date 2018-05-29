/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Engine.js
 * This code provides the game loop functionality (render),
 * draws the initial game board on the screen, and then calls render method.
 *
 * A game engine works by drawing the entire game screen over and over.
 */
var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var gameOn = false;
    var playerTurn = false;
    //var colors = ['darkred'   , 'darkorange'    , 'darkblue'    , 'darkgreen'   , 'greyish',     , 'yellow'        , 'redish'];
    var colors = ['rgb(139,0,0)', 'rgb(255,140,0)', 'rgb(0,0,139)', 'rgb(0,100,0)', 'rgb(42,48,60)', 'rgb(255,255,0)', 'rgb(254,0,0)'];
    var litcolors = ['red', 'yellow', 'lightblue', 'lightgreen'];
    var score = 0;
    var delayTime = 1000;
    var strictOn = false;
    var states = [false, false, false, false];
    var computerSequence = [];
    var playerSequence = [];
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 500;
    canvas.height = 500;
    doc.body.appendChild(canvas);
    //canvas.style.cursor = "crosshair";

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the render method.
     * it is initiated by init().
     */
    function main() {
        /* Use the browser's requestAnimationFrame function to call this
        * function again as soon as the browser is able to draw another frame.
        */
        render();
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once.
     */
    function init() {
        console.log("init function called");
        reset();
        lastTime = Date.now();
        render();
        main();
    }

    /* This function initially draws the "game level"
     */
    function render() {
        //console.log("render function");
        litquadrant = -1;
        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        writeMessage(ctx, 176, 234, "Simon");
        writeMessage2(ctx, 184, 300, "COUNT");
        writeMessage2(ctx, 239, 300, "START");
        writeMessage2(ctx, 285, 300, "STRICT");
        writeMessage2(ctx, 214, 330, "OFF");
        writeMessage2(ctx, 278, 330, "ON");
        writeMessage3(ctx, 190, 282, scoreText(score));

        //Draw a circle red
        drawCircle(ctx, 252, 275, 8, colors[6]);
        //Draw a circle yellow
        drawCircle(ctx, 298, 275, 8, colors[5]);
        //Draw a circle small red
        if (strictOn && gameOn) {
            drawCircle(ctx, 298, 258, 3, "red");
        } else {
            drawCircle(ctx, 298, 258, 3, "#2a303a");
        }

        //Draw recangle
        ctx.fillStyle = colors[4];
        ctx.fillRect(235, 320, 40, 14);

        //Draw recangle
        ctx.fillStyle = 'lightblue';
        if (gameOn) {
            ctx.fillRect(255, 321, 18, 12);
        } else {
            ctx.fillRect(236, 321, 18, 12);
        }

        outerRadius = canvas.width * 0.45;
        innerRadius = canvas.width * 0.20;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        var i;
        for (i = 0; i < 4; i++) {
            slice(ctx,i);
        }
        ctx.translate(canvas.width / 2, canvas.height / 2);

    }
    /* This function resets the game
     */
    function reset() {
        console.log("reset function called");
        score = 0;
        delayTime = 1000;
        states = [false, false, false, false];
        computerSequence = [];
        playerSequence = [];
        playerTurn = false;

    }
     /* This function draws a quadrant
     */
    function slice(ctx, quadrant) {
        ctx.rotate(quadrant * Math.PI / 2);
        ctx.beginPath();
        ctx.arc(-5, -5, innerRadius, Math.PI, 3 * Math.PI / 2);
        //ctx.lineTo(-5, -outerRadius - 5);
        ctx.arc(-5, -5, outerRadius, 3 * Math.PI / 2, Math.PI, true);
        //ctx.closePath();
        //console.log("states in Engine slice = ", states);
        if (states[quadrant]) {
            ctx.fillStyle = litcolors[quadrant];
            //console.log("litcolors[quadrant] called");
        } else {
            ctx.fillStyle = colors[quadrant];
        }
        ctx.fill();
        ctx.strokeStyle = '#2a303a';
        ctx.lineWidth = 20;
        ctx.stroke();
    }
    function writeMessage(context, x, y, message) {
        context.clearRect(x, y - 10, canvas.width, 10);
        context.font = '42pt Pacifico';
        context.fillStyle = 'black';
        context.fillText(message, x, y);
    }
    function writeMessage2(context, x, y, message) {
        context.clearRect(x, y - 10, canvas.width, 10);
        context.font = '8pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, x, y);
    }
    function writeMessage3(context, x, y, message) {
        context.fillRect(x - 5, y - 20, 30, 30);
        context.font = '15pt Calibri';
        context.fillStyle = 'red';
        context.fillText(message, x, y);
    };
    function drawCircle(context, x, y, radius, color) {
        //Draw a circle
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = '#2a303a';
        context.lineWidth = 2;
        context.stroke();
    };
    function scoreText(score) {
        // convert score to a two diget string
        if (gameOn) {
            if (score === 0) {
                return "---";
            } else {
                if (score < 10) {
                    return "0" + score.toString();
                } else {
                    return score.toString();
                }
            }
        } else {
            return "";
        }
    };
 
    function audio(track) {
        var sound = {
            0: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        };
        sound[track].load();
        sound[track].play();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* This function sets a delay
     */
    const delay = (duration) =>
        new Promise(resolve => setTimeout(resolve, duration));

    /* This function adds a Quadrant to the computer sequence"
     */
    async function addQuadrant() {
        var randomInt = getRandomInt(0, 3);
        await console.log("randomInt = ", randomInt);
        // Light colour and play sound
        states[randomInt] = true;
        console.log("call audio from addQuadrant");
        audio(randomInt);
        await delay(delayTime);
        states[randomInt] = false;
        await computerSequence.push(randomInt);
        await console.log("computerSequence = ", computerSequence);
        playerTurn = true;
    }

    /* This function plays the computer sequence"
     */
    async function playComputerSequence(counter) {
        if (counter < computerSequence.length) {
            await delay(300);
            states[computerSequence[counter]] = true;
            console.log("call audio from playComputerSequence counter = ", counter);
            audio(computerSequence[counter]);
            await console.log("states[computerSequence[counter]]: ", states);
            await delay(delayTime);
            await console.log("The index of this number is: " + counter);
            states[computerSequence[counter]] = false;
            await console.log("states: ", states);
            counter++;
            await playComputerSequence(counter);
        } else {
            await delay(300);
        }
    }

    /* This function handles the computers turn"
     */
    async function computerTurn() {
        // Add 1 to score
        score++;
        if (score === 5) {
            delayTime = 800;
        } else if (score === 9) {
            delayTime = 600;
        } else if (score === 13) {
            delayTime = 400;
        } else if (score > 20) {
            alert("Well done you win!");
            reset();
            computerTurn();
            return;
        }
        // play playedArray then add random quadrant
        await playComputerSequence(0);
        await delay(300);
        await addQuadrant();
        //console.log("computerTurn");
    }

    /* This function checks for a color match from a mouse click
     */
    function hasSameColor(color, quadrant) {
        return quadrant === color;
    }

    /* This function checks if the player has the correct sequence
     */
    function compareSequence(playerSequence, computerSequence) {
        // compare the computer sequence to the player sequence
        return playerSequence === computerSequence;
    }

    /* This function handles mouse up
     */
    async function actionMouseUp(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        // Check the color to find where your mouse clicked.
        // get pixel under cursor
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        // create rgb color for that pixel
        const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        console.log("color ", color);
        console.log("colors[4] ", colors[4]);
        if (hasSameColor(color, colors[4])) {
            // switch game on or off
            if (gameOn) {
                gameOn = false;
                strictOn = false;
                reset();
            } else {
                gameOn = true;
            }
            console.log("gameOn = ", gameOn);
        }

        if (hasSameColor(color, colors[5])) {
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

        if (hasSameColor(color, colors[6])) {
            // Start game
            if (gameOn && score === 0) {
                console.log("Start ");
                computerTurn();
                return;
            }
        }

        if (gameOn && playerTurn) {
            // find a quadrent with the same colour
            var i;
            for (i = 0; i < 4; i++) {
                if (hasSameColor(color, colors[i])) {
                    var selected = i;
                    console.log('click on quadrant = ', selected);
                    // Light colour and play sound
                    states[selected] = true;
                    console.log("call audio from Mouseup");
                    audio(selected);
                    playerTurn = false;
                    //console.log("states = ", states);
                    await delay(delayTime);
                    states[selected] = false;
                    playerSequence.push(selected);
                    if (!compareSequence(selected, computerSequence.slice(playerSequence.length - 1, playerSequence.length)[0])) {
                        if (strictOn) {
                            // Restart game
                            alert("Invalid sequence, start again");
                            reset();
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

    // Call init() to instantiate the game
    init();

})(this);


