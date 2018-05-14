// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    console.log("Enemy");
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = 1;
    this.speed = 100;
          //ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) { this.x = -100; }
    this.x += this.speed * dt;
};
Enemy.prototype.location = function () {
    // Updates the Enemy location
    //console.log("Enemy.prototype.location");
    return [Math.floor(this.x / 100), this.y];

};

Enemy.prototype.collision = function () {
    // Handles collision with the Player
    if (this.location == player.location) {
        /* reset at this point */
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    //console.log("Enemy.prototype.render");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 83 - 21); // was 62
};

// Now write your own player class
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
var allEnemies = [];
var amy = new Enemy();
amy.y = 1;
amy.speed = 100;
allEnemies.push(amy);
var bob = new Enemy();
bob.y = 2;
bob.speed = 200;
allEnemies.push(bob);
var cam = new Enemy();
cam.y = 3;
cam.speed = 400;
allEnemies.push(cam);
//console.log("allEnemies = ", allEnemies);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
