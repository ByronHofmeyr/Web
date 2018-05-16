// Simon game is implemented as a class that can be reused. 
var Simon = (function () {

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
     */
    var Engine = (function (global) {
        /* Predefine the variables we'll be using within this scope,
         * create the canvas element, grab the 2D context for that canvas
         * set the canvas elements height/width and add it to the DOM.
         */
        var states = [false, false, false, false];
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
                dt = (now - lastTime) / 1000.0;

            /* Call our update/render functions, pass along the time delta to
             * our update function since it may be used for smooth animation.
             */
            update(dt);
            render();

            /* Set our lastTime variable which is used to determine the time delta
             * for the next time this function is called.
             */
            lastTime = now;

            /* Use the browser's requestAnimationFrame function to call this
             * function again as soon as the browser is able to draw another frame.
             */
            //win.requestAnimationFrame(main);
        }

        /* This function does some initial setup that should only occur once,
         * particularly setting the lastTime variable that is required for the
         * game loop.
         */
        function init() {
            console.log("init function called");
            reset();
            lastTime = Date.now();
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
            console.log("render function");
            litquadrant = -1;
            // Before drawing, clear existing canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            /* Loop through the number of rows and columns we've defined above
             * and, using the rowImages array, draw the correct image for that
             * portion of the "grid"
             */
            c = canvas;
            //writeMessage(ctx, 10, 25, "" + score);
            writeMessage(c, 176, 234, "Simon");
            writeMessage3(c, 190, 282, "02");
            writeMessage2(c, 184, 300, "COUNT");
            writeMessage2(c, 239, 300, "START");
            writeMessage2(c, 285, 300, "STRICT");
            writeMessage2(c, 214, 330, "OFF");
            writeMessage2(c, 278, 330, "ON");
            

            //Draw a circle red
            ctx.beginPath();
            ctx.arc(252, 275, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.strokeStyle = '#2a303a';
            ctx.lineWidth = 2;
            ctx.stroke();

            //Draw a circle yellow
            ctx.beginPath();
            ctx.arc(298, 275, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.strokeStyle = '#2a303a';
            ctx.lineWidth = 2;
            ctx.stroke();

            //Draw a circle small red
            ctx.beginPath();
            ctx.arc(298, 258, 3, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.strokeStyle = '#2a303a';
            ctx.lineWidth = 2;
            ctx.stroke();

            //Draw recangle
            ctx.beginPath();
            ctx.fillStyle = '#2a303a';
            ctx.fillRect(235, 320, 40, 14);

            //Draw recangle
            ctx.beginPath();
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(255, 321, 18, 12);            

            outerRadius = c.width * 0.45;
            innerRadius = c.width * 0.20;

            ctx.translate(c.width / 2, c.height / 2);
            var i;
            for (i = 0; i < 4; i++) {
                states[i] = (litquadrant == i);
                slice(i);
            }
            //ctx.translate(-c.width / 2, -c.height / 2);
        }
        var slice = function (quadrant) {
            ctx.rotate(quadrant * Math.PI / 2);
            ctx.beginPath();
            ctx.arc(-5, -5, innerRadius, Math.PI, 3 * Math.PI / 2);
            //ctx.lineTo(-5, -outerRadius - 5);
            ctx.arc(-5, -5, outerRadius, 3 * Math.PI / 2, Math.PI, true);
            //ctx.closePath();
            if (states[quadrant]) {
                ctx.fillStyle = litcolors[quadrant];
            } else {
                ctx.fillStyle = colors[quadrant];
            }
            ctx.fill();
            ctx.strokeStyle = '#2a303a';
            ctx.lineWidth = 20;
            ctx.stroke();
            //ctx.rotate(-quadrant * Math.PI / 2);


            //renderEntities();
        }
        var writeMessage = function (canvas, x, y, message) {
            var context = canvas.getContext('2d');
            context.clearRect(x, y - 10, canvas.width, 10);
            context.font = '42pt Pacifico';
            context.fillStyle = 'black';
            context.fillText(message, x, y);
        }
        var writeMessage2 = function (canvas, x, y, message) {
            var context = canvas.getContext('2d');
            context.clearRect(x, y - 10, canvas.width, 10);
            context.font = '8pt Calibri';
            context.fillStyle = 'black';
            context.fillText(message, x, y);
        }
        var writeMessage3 = function (canvas, x, y, message) {
            var context = canvas.getContext('2d');
            context.fillRect(x -5, y - 20, 30, 30);
            context.font = '15pt Calibri';
            context.fillStyle = 'red';
            context.fillText(message, x, y);
        }

        /* This function does nothing but it could have been a good place to
         * handle game reset states - maybe a new game menu or a game over screen
         * those sorts of things. It's only called once by the init() method.
         */
        function reset() {
            // noop
        }

        // Call init() to instantiate the game
        init();
        //global.ctx = ctx;
    })(this);



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // This is the starting point and is called from HTML onload
    //simon.run = function (canvas) {
    //    console.log("Simon.run function call");

    //}


})(); // End of Simon class