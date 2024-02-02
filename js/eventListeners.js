/**
 * Handle keyboard keydown events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
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

/**
 * Handle keyboard keyup events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
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

/**
 * Handle touch events for mobile buttons.
 */
function mobileButtonTouch() {
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
window.addEventListener('orientationchange', toggleRotateScreen, toggleMobileButtonContainer, toggleIngameMenu);
window.addEventListener('resize', toggleRotateScreen, toggleMobileButtonContainer, toggleIngameMenu);
