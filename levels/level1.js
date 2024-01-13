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
            ],
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
                new Coin(200, 200),
                new Coin(250, 150),     // 1. pack
                new Coin(300, 200),

                new Coin(1000, 100),
                new Coin(1050, 150),    // 2. pack
                new Coin(1050, 50),
                new Coin(1100, 100),
                
                new Coin(1450, 200),    // 3. coin

                new Coin(1800, 150),    // 4. pack
                new Coin(1800, 75),

                new Coin(2400, 150),
                new Coin(2450, 200),    // 5. pack
                new Coin(2500, 150), 

                new Coin(2750, 50),     // 6. coin
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
            [new Endboss()
            ]
        );
        console.log("Level initialisiert: ", level1);
        console.log("Münzen: ", level1.coins);
        console.log("Flaschen: ", level1.bottles);
    } catch (e) {
        console.error("Fehler bei der Initialisierung des Levels: ", e);
    }
}