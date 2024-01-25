let canvas;
let world;
let gameActive = true;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/game.mp3');
let gameWon = new Audio('audio/game_won.mp3');
let gameLost = new Audio('audio/game_lost.mp3');
let backgroundMusicMuted = false;


function init() {
    gameActive = true;
    initLevel();
    playBackgroundMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    HideScreens();
    toggleRotateScreen();
    MobileButtonTouch();
    toggleMobileButtonContainer();
}


function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.muted = backgroundMusicMuted;
    backgroundMusic.play();
}


function updateMusicToggleButton() {
    let musicToggleButton = document.getElementById('music-toggle-button');
    
    if (backgroundMusicMuted) {
        musicToggleButton.innerText = 'Sound Off';
    } else {
        musicToggleButton.innerText = 'Sound On';
    }
}


function toggleBackgroundMusic() {
    backgroundMusicMuted = !backgroundMusicMuted;
    backgroundMusic.muted = backgroundMusicMuted;
    updateMusicToggleButton();
}


function HideScreens() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('EndScreen').style.display = 'none';
}


function showEndScreen() {
    gameActive = false;
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


function openControls() {
    document.getElementById('controlsScreen').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}


function closeControls() {
    document.getElementById('controlsScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}


function openSettings() {
    document.getElementById('settingsScreen').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}


function closeSettings() {
    document.getElementById('settingsScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}


function openStory() {
    document.getElementById('storyScreen').style.display = 'flex';
    document.getElementById('menu').style.display = 'none';
}


function closeStory() {
    document.getElementById('storyScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}


function toggleFullScreen() {
    let container = document.getElementById('canvas-container');
    let canvas = document.getElementById('canvas');
    let fullscreenButton = document.querySelector('.fullscreen-toggle');

    if (!document.fullscreenElement) {
        requestFullscreen(container);
        setCanvasSize(canvas, '100vw', '100vh');
        fullscreenButton.innerText = 'Fullscreen Off';
    } else {
        exitFullscreen();
        resetCanvasSize(canvas);
        fullscreenButton.innerText = 'Fullscreen On';
    }
}


function setCanvasSize(canvas, width, height) {
    canvas.style.width = width;
    canvas.style.height = height;
}


function resetCanvasSize(canvas) {
    setCanvasSize(canvas, '720px', '480px');
}


function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


function adjustCanvasSize() {
    let canvas = document.getElementById('canvas');
    if (document.fullscreenElement) {
        setCanvasSize(canvas, '100vw', '100vh');
    } else {
        resetCanvasSize(canvas);
    }
}


function refreshPage() {
    window.location.reload();
}


function gameWonSound() {
    gameWon.play();
}


function gameLostSound() {
    gameLost.play();
}


function onFullscreenChange() {
    let fullscreenButton = document.querySelector('.fullscreen-toggle');
    if (document.fullscreenElement) {
        fullscreenButton.innerText = 'Fullscreen Off';
        setCanvasSize(document.getElementById('canvas'), '100vw', '100vh');
    } else {
        fullscreenButton.innerText = 'Fullscreen On';
        resetCanvasSize(document.getElementById('canvas'));
    }
}


function toggleRotateScreen() {
    const rotateContainer = document.querySelector('.rotate-container');

    if (window.innerWidth <= 1368 && window.innerHeight > window.innerWidth) {
        rotateContainer.style.display = 'flex';
    } else {
        rotateContainer.style.display = 'none';
    }
}


function toggleMobileButtonContainer() {
    const mobileButtonContainer = document.querySelector('.mobile-button-container');
    const isMobileMode = window.innerWidth <= 1368;

    if (isMobileMode) {
        mobileButtonContainer.style.display = 'flex';
    } else {
        mobileButtonContainer.style.display = 'none';
    }
}


window.addEventListener("keydown", (event) => {
    if (!gameActive) return;

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
    if (!gameActive) return;

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


function MobileButtonTouch() {
    const leftButton = document.getElementById("mobile-left");
    const rightButton = document.getElementById("mobile-right");
    const jumpButton = document.getElementById("mobile-jump");
    const throwButton = document.getElementById("mobile-throw");

    leftButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    leftButton.addEventListener("touchend", (event) => {
        keyboard.LEFT = false;
    });

    rightButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    rightButton.addEventListener("touchend", (event) => {
        keyboard.RIGHT = false;
    });

    jumpButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    jumpButton.addEventListener("touchend", (event) => {
        keyboard.SPACE = false;
    });

    throwButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    throwButton.addEventListener("touchend", (event) => {
        keyboard.D = false;
    });
}


document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
document.addEventListener("msfullscreenchange", onFullscreenChange);
window.addEventListener('DOMContentLoaded', () => {
    toggleRotateScreen();
});
window.addEventListener('orientationchange', toggleRotateScreen, toggleMobileButtonContainer);
window.addEventListener('resize', toggleRotateScreen, toggleMobileButtonContainer);
