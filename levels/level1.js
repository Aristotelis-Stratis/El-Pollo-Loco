let level1;

function initLevel() {
    try {
        level1 = new Level(
            [
                // new Chicken(),
                // new Chicken(),
                // new Chicken(),
                // new Chicken(),
                // new Chicken(),
                // new Chicken(),
                new Endboss()
            ],
            // ENDBOSS HERE
            [
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
            ],
            [
                new BackgroundObject('img/5_background/layers/air.png', -719),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

                new BackgroundObject('img/5_background/layers/air.png', 0),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

                new BackgroundObject('img/5_background/layers/air.png', 719),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

                new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

                new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

                new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

                new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
            ],
            [
                new Coin(250, 100),
                new Coin(400, 150),
                new Coin(600, 160),
                new Coin(800, 90),
                new Coin(1000, 50),
                new Coin(1200, 140),
                new Coin(1600, 200),
                new Coin(2000, 220)
            ],
            [
                new Bottles(0, 100),
                new Bottles(0, 200),
                new Bottles(0, 300),
                new Bottles(0, 400),
                new Bottles(0, 500),
                new Bottles(0, 600),
                new Bottles(0, 800),
                new Bottles(0, 1000),
                new Bottles(0, 1200),
                new Bottles(0, 1400),
                new Bottles(0, 1600),
                new Bottles(0, 1800),
                new Bottles(0, 2000),
            ],
        );
        console.log("Level initialisiert: ", level1);
        console.log("Münzen: ", level1.coins);
        console.log("Flaschen: ", level1.bottles);
    } catch (e) {
        console.error("Fehler bei der Initialisierung des Levels: ", e);
    }
}