/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Resources.js
 * 
 */

function audio(track) {
    var sound = {
        0: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    } 
    console.log("Audio function track = ", track );
    sound[track].load();
    sound[track].play();
}