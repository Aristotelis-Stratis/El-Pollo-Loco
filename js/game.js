let canvas;
let world;
let keyboard = new Keyboard();
backgroundMusic = new Audio('audio/game.mp3');
gameWon = new Audio('audio/game_won.mp3')
gameLost = new Audio('audio/game_lost.mp3');
backgroundMusic.muted = true;

function init() {
    initLevel();
    playBackgroundMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    HideScreens();
}

function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.muted = false;
    backgroundMusic.play();
}


function HideScreens() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('EndScreen').style.display = 'none'; 
}

function showEndScreen() {
    let endScreen = document.getElementById('EndScreen');
    if (world.isEndbossDefeated()) {
        gameWonSound();
        endScreen.style.backgroundImage = "url('img/9_intro_outro_screens/start/game_over/game over.png')";
    } else if (world.isCharacterDead()) {
        gameLostSound();
        endScreen.style.backgroundImage = "url('img/9_intro_outro_screens/start/game_over/you lost.png')";
    }

    endScreen.style.display = 'flex';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function refreshPage(){
    window.location.reload();
} 

function gameWonSound(){
    gameWon.play();
}
function gameLostSound(){
    gameLost.play();
}


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});


