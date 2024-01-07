let canvas;
let world;
let keyboard = new Keyboard();
backgroundMusic = new Audio('audio/game.mp3');
backgroundMusic.muted = true;

function init() {
    initLevel();
    // playBackgroundMusic(); 
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    console.log('My Character is', world.character);
    HideStartScreen();
}

function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.muted = false;
    backgroundMusic.play();
}


function HideStartScreen() {
    // Verstecke den Startbildschirm
    document.getElementById('startScreen').style.display = 'none';
    // Zeige den Spielinhalt
    document.getElementById('content').style.display = 'block';
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


