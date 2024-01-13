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
                new Coin(200, 150),
                new Coin(250, 100),
                new Coin(300, 150),

                new Coin(1000, 100),
                new Coin(1050, 150),
                new Coin(1050, 50),
                new Coin(1100, 100),

                new Coin(1450, 200),

                new Coin(1800, 150),
                new Coin(1800, 75),

                new Coin(2400, 150),
                new Coin(2450, 100),
                new Coin(2500, 150),

                new Coin(2750, 50)
            ],
            [
                new Bottles(0, 375),
                new Bottles(100, 375),
                new Bottles(650, 375),
                new Bottles(950, 375),
                new Bottles(1200, 375),

                new Bottles(1300, 375),
                new Bottles(1450, 375),
                
                new Bottles(1650, 375),
                new Bottles(1750, 375),
                new Bottles(2050, 375),
                new Bottles(2350, 375),
                new Bottles(2550, 375),
                new Bottles(2950, 375),
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

    // JUMP() + JumpCollision() auf enemies
    // removeEnemyFromCanvas
    // Anpassen das HP nicht so schnell reduziert wird bei Collision
    // End-Screen
    // Restart Button
    // Mobile + Knöpfe
    // Finishing up
