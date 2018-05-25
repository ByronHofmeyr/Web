/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Engine.js
 * This code provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods.
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 *
 */
var gameOn = false;
var score = 0;
var strictOn = false;
var states = [false, false, false, false];
var computerSequence = [];

var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    
    //var gameOn = false;
    

    var litcolors = ['red', 'yellow', 'lightblue', 'lightgreen'];
    var colors = ['darkred', 'darkorange', 'darkblue', 'darkgreen'];

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 500;
    canvas.height = 500;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0; // was 1000.0

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
        * function again as soon as the browser is able to draw another frame.
        */

        //setTimeout(function () {
        update(dt);
        render();

        win.requestAnimationFrame(main);
        //}, 1000); // How long do you want the delay to be (in milliseconds)?
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        console.log("init function called");
        reset();
        lastTime = Date.now();
        render();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. 
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        /* ...*/
        //console.log("updateEntities(dt) function called");
        //writeMessage3(ctx, 190, 282, "04");
        //player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* 
         */
        //console.log("render function");
        litquadrant = -1;
        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

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
            //states[i] = (litquadrant == i);
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
    }
    var writeMessage = function (context, x, y, message) {
        //var context = canvas.getContext('2d');
        context.clearRect(x, y - 10, canvas.width, 10);
        context.font = '42pt Pacifico';
        context.fillStyle = 'black';
        context.fillText(message, x, y);
    }
    var writeMessage2 = function (context, x, y, message) {
        //var context = canvas.getContext('2d');
        context.clearRect(x, y - 10, canvas.width, 10);
        context.font = '8pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, x, y);
    }
    var writeMessage3 = function (context, x, y, message) {
        //var context = canvas.getContext('2d');
        //console.log("writeMessage3 function called");
        context.fillRect(x - 5, y - 20, 30, 30);
        context.font = '15pt Calibri';
        context.fillStyle = 'red';
        context.fillText(message, x, y);
    }
    var drawCircle = function (context, x, y, radius, color) {
        //Draw a circle
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = '#2a303a';
        context.lineWidth = 2;
        context.stroke();
    }
    var scoreText = function (score) {
        // convert score to a two diget string
        if (gameOn) {
            if (score == 0) {
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

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        console.log("reset function called");
        // noop
    }

    // Call init() to instantiate the game
    init();
    global.ctx = ctx;
    global.canvas = canvas;

})(this);


