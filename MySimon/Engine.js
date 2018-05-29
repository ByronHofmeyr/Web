/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Engine.js
 * This code provides the game loop functionality (render),
 * draws the initial game board on the screen, and then calls render method.
 *
 * A game engine works by drawing the entire game screen over and over.
 */

// Declare global variables
var gameOn = false;
var playerTurn = false;
//var colors = ['darkred', 'darkorange', 'darkblue', 'darkgreen'];
var colors = ['rgb(139,0,0)', 'rgb(255,140,0)', 'rgb(0,0,139)', 'rgb(0,100,0)'];
var score = 0;
var strictOn = false;
var states = [false, false, false, false];
var computerSequence = [];
var playerSequence = [];


var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */

    var litcolors = ['red', 'yellow', 'lightblue', 'lightgreen'];
    
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 500;
    canvas.height = 500;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the render method.
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
        /* 
         */
        //console.log("render function");
        litquadrant = -1;
        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //writeMessage(ctx, 10, 25, "" + score);
        writeMessage(ctx, 176, 234, "Simon");

        writeMessage2(ctx, 184, 300, "COUNT");
        writeMessage2(ctx, 239, 300, "START");
        writeMessage2(ctx, 285, 300, "STRICT");
        writeMessage2(ctx, 214, 330, "OFF");
        writeMessage2(ctx, 278, 330, "ON");
        writeMessage3(ctx, 190, 282, scoreText(score));

        //Draw a circle red
        drawCircle(ctx, 252, 275, 8, "red");
        //Draw a circle yellow
        drawCircle(ctx, 298, 275, 8, "yellow");
        //Draw a circle small red
        if (strictOn && gameOn) {
            drawCircle(ctx, 298, 258, 3, "red");
        } else {
            drawCircle(ctx, 298, 258, 3, "#2a303a");
        }

        //Draw recangle
        ctx.fillStyle = '#2a303a';
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
            slice(i);
        }
        ctx.translate(canvas.width / 2, canvas.height / 2);

    }
    var slice = function (quadrant) {
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
        //ctx.rotate(-quadrant * Math.PI / 2);
    };
    var writeMessage = function (context, x, y, message) {
        context.clearRect(x, y - 10, canvas.width, 10);
        context.font = '42pt Pacifico';
        context.fillStyle = 'black';
        context.fillText(message, x, y);
    };
    var writeMessage2 = function (context, x, y, message) {
        context.clearRect(x, y - 10, canvas.width, 10);
        context.font = '8pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, x, y);
    };
    var writeMessage3 = function (context, x, y, message) {
        //console.log("writeMessage3 function called");
        context.fillRect(x - 5, y - 20, 30, 30);
        context.font = '15pt Calibri';
        context.fillStyle = 'red';
        context.fillText(message, x, y);
    };
    var drawCircle = function (context, x, y, radius, color) {
        //Draw a circle
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = '#2a303a';
        context.lineWidth = 2;
        context.stroke();
    };
    var scoreText = function (score) {
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

    function reset() {
        console.log("reset function called");
        score = 0;
        states = [false, false, false, false];
        computerSequence = [];

    }

    // Call init() to instantiate the game
    init();
    global.ctx = ctx;
    global.canvas = canvas;

})(this);


