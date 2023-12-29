const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
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
    ]
);

// function initLevel() {
//     level1 = new Level(
//         createBackgrounds(),
//         createClouds(),
//         createBottles(),
//         createChickens(),
//         createEndboss()
//     );
// }

// function createBackgrounds() {
//     return [
//         new BackgroundObject('img/5_background/layers/air.png', -719),
//         new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
//         new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
//         new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

//         new BackgroundObject('img/5_background/layers/air.png', 0),
//         new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
//         new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
//         new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

//         new BackgroundObject('img/5_background/layers/air.png', 719),
//         new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
//         new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
//         new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

//         new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
//         new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
//         new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
//         new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

//         new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
//         new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
//         new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
//         new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),


//         new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
//         new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
//         new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
//         new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
//     ];
// }

// function createClouds() {
//     return [
//         new Cloud(),
//         new Cloud(),
//         new Cloud(),
//         new Cloud(),
//         new Cloud(),
//         new Cloud()
//     ];
// }

// function createBottles() {
//     return [
//         new Bottles(0, 100),
//         new Bottles(0, 200),
//         new Bottles(0, 300),
//         new Bottles(0, 400),
//         new Bottles(0, 500),
//         new Bottles(0, 600),
//         new Bottles(0, 800),
//         new Bottles(0, 1000),
//         new Bottles(0, 1200),
//         new Bottles(0, 1400),
//         new Bottles(0, 1600),
//         new Bottles(0, 1800),
//         new Bottles(0, 2000),
//     ];
// }

// function createChickens() {
//     return [
//         new Chicken(),
//         new Chicken(),
//         new Chicken(),
//         new Chicken(),
//         new Chicken(),
//         new Chicken(),
//         new Endboss()
//     ];
// }

// function createEndboss() {
//     return [new Endboss()];
// }