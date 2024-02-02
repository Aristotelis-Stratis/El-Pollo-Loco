let canvas;
let world;
let gameActive = true;
let keyboard = new Keyboard();
let intervals = [];

/**
 * Initialize the game.
 */
function init() {
    resetGame();
    gameActive = true;
    initLevel();
    playBackgroundMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    hideScreens();
    toggleRotateScreen();
    mobileButtonTouch();
    toggleIngameMenu();
    toggleMobileButtonContainer();
    muteSounds();
}

/**
 * Reset the requestAnimationFrame ID.
 */
function resetAnimationFrameId() {
    if (requestAnimationFrameId !== 0) {
        cancelAnimationFrame(requestAnimationFrameId);
    }
    requestAnimationFrameId = 0;
}

/**
 * Reset the game.
 */
function resetGame() {
    keyboard = new Keyboard();
    intervals = [];
    world = null;
}

/**
 * Add an interval to the intervals array.
 * @param {number} interval - The ID of the interval.
 */
function addInterval(interval) {
    intervals.push(interval);
}

/**
 * Stop all intervals and requestAnimationFrame.
 */
function stopAllIntervals() {
    resetAnimationFrameId();
    intervals.forEach((intervalId) => {
        clearInterval(intervalId);
    });
    intervals = [];
}

/**
 * Return to the main menu.
 */
function returnToMenu() {
    stopAllIntervals();
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('ig-menu').style.display = 'none';
}

/**
 * Hide various screens.
 */
function hideScreens() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('endScreen').style.display = 'none';
}

/**
 * Show the end game screen.
 */
function showEndScreen() {
    gameActive = false;
    const endScreen = document.getElementById('endScreen');
    const mobileButtonContainer = document.querySelector('.mobile-button-container');
    if (world.isEndbossDefeated()) {
        showGameWonScreen(endScreen, mobileButtonContainer);
    } else if (world.isCharacterDead()) {
        showGameLostScreen(endScreen, mobileButtonContainer);
    }
    endScreen.style.display = 'flex';
    stopBackgroundMusic();
    stopAllIntervals();
}

/**
 * Show the game won screen.
 * @param {HTMLElement} endScreen - The end screen element.
 * @param {HTMLElement} mobileButtonContainer - The mobile button container element.
 */
function showGameWonScreen(endScreen, mobileButtonContainer) {
    gameWonSound();
    endScreen.style.backgroundImage = "url('img/9_intro_outro_screens/start/game_over/game over.png')";
    mobileButtonContainer.style.display = 'none';
}

/**
 * Show the game lost screen.
 * @param {HTMLElement} endScreen - The end screen element.
 * @param {HTMLElement} mobileButtonContainer - The mobile button container element.
 */
function showGameLostScreen(endScreen, mobileButtonContainer) {
    gameLostSound();
    endScreen.style.backgroundImage = "url('img/9_intro_outro_screens/start/game_over/you lost.png')";
    mobileButtonContainer.style.display = 'none';
}

/**
 * Open the controls screen.
 */
function openControls() {
    document.getElementById('controlsScreen').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}

/**
 * Close the controls screen.
 */
function closeControls() {
    document.getElementById('controlsScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

/**
 * Open the settings screen.
 */
function openSettings() {
    document.getElementById('settingsScreen').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}

/**
 * Close the settings screen.
 */
function closeSettings() {
    document.getElementById('settingsScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

/**
 * Open the story screen.
 */
function openStory() {
    document.getElementById('storyScreen').style.display = 'flex';
    document.getElementById('menu').style.display = 'none';
}

/**
 * Close the story screen.
 */
function closeStory() {
    document.getElementById('storyScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

/**
 * Toggle fullscreen mode.
 */
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

/**
 * Set the canvas size.
 * @param {HTMLElement} canvas - The canvas element.
 * @param {string} width - The width of the canvas.
 * @param {string} height - The height of the canvas.
 */
function setCanvasSize(canvas, width, height) {
    canvas.style.width = width;
    canvas.style.height = height;
}

/**
 * Reset the canvas size to default.
 * @param {HTMLElement} canvas - The canvas element.
 */
function resetCanvasSize(canvas) {
    setCanvasSize(canvas, '720px', '480px');
}

/**
 * Request fullscreen mode.
 * @param {HTMLElement} element - The element to make fullscreen.
 */
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * Exit fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


/**
 * Adjust canvas size based on fullscreen state.
 */
function adjustCanvasSize() {
    let canvas = document.getElementById('canvas');
    if (document.fullscreenElement) {
        setCanvasSize(canvas, '100vw', '100vh');
    } else {
        resetCanvasSize(canvas);
    }
}


/**
 * Handle fullscreen change event.
 */
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


/**
 * Toggle the rotate screen container based on window dimensions.
 */
function toggleRotateScreen() {
    const rotateContainer = document.querySelector('.rotate-container');

    if (window.innerWidth <= 1368 && window.innerHeight > window.innerWidth) {
        rotateContainer.style.display = 'flex';
    } else {
        rotateContainer.style.display = 'none';
    }
}


/**
 * Toggle the mobile button container based on window dimensions.
 */
function toggleMobileButtonContainer() {
    const mobileButtonContainer = document.querySelector('.mobile-button-container');
    const isMobileMode = window.innerWidth <= 1368;

    if (isMobileMode) {
        mobileButtonContainer.style.display = 'flex';
    } else {
        mobileButtonContainer.style.display = 'none';
    }
}

/**
 * Toggle the in-game menu.
 */
function toggleIngameMenu() {
    const ingameMenu = document.getElementById('ig-menu');
    ingameMenu.style.display = 'flex';
}