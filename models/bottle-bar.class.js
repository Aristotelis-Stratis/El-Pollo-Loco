// Konstante für die maximale Anzahl von Flaschen in der Statusleiste
const MAX_BOTTLES = 13;

class BottleBar extends DrawableObject {
    // Array mit Pfaden zu den Bildern der verschiedenen Flaschenstadien
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    // Variable zur Speicherung der gesammelten Flaschen
    collectedBottles = 0;

    constructor() {
        // Aufruf des Konstruktors der übergeordneten Klasse
        super();
        // Laden der Bilder für die Flaschen
        this.loadImages(this.IMAGES_BOTTLES);
        // Setzen der Position und Größe der Statusleiste
        this.x = 40;
        this.y = 100; // Ändere die vertikale Position nach Bedarf
        this.width = 200;
        this.height = 60;
        // Initialisieren der gesammelten Flaschen auf 0
        this.setCollectedBottles(0);
    }

    // Methode zur Aktualisierung der gesammelten Flaschen
    setCollectedBottles(count) {
        // Ausgabe der Anzahl der gesammelten Flaschen in der Konsole
        console.log(`Number of collected bottles: ${count}`);
        // Setzen der aktuellen Anzahl der gesammelten Flaschen
        this.collectedBottles = count;
        // Bestimmen des Bildpfads basierend auf dem Fortschritt
        let path = this.IMAGES_BOTTLES[this.resolveImagesIndex()];
        // Laden des Bildes für die Statusleiste
        this.img = this.imageCache[path];
    }

    // Methode zur Bestimmung des Index für das Bild basierend auf dem Fortschritt
    resolveImagesIndex() {
        // Berechnung des Prozentsatzes des Fortschritts
        let percentage = (this.collectedBottles / MAX_BOTTLES) * 100;

        // Bestimmung des Index basierend auf dem Prozentsatz
        if (percentage >= 80) {
            return 5;
        } else if (percentage >= 60) {
            return 4;
        } else if (percentage >= 40) {
            return 3;
        } else if (percentage >= 20) {
            return 2;
        } else if (percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}