const indikatoren = document.getElementsByClassName("indikator");
indikatoren[0].classList.add("aktiv");

const slides = document.getElementsByClassName("slide");
slides[0].classList.add("aktiv");

var aktuellerIndex = 0;
var letzteAktualisierung = new Date();

// Variable zum Halten des Pausiert-Status
var pausiert = false;

function umschalten(anzahl) {
	var neuerIndex = aktuellerIndex + anzahl;

	if (neuerIndex < 0) {
		neuerIndex = slides.length - 1;
	}

	if (neuerIndex > slides.length - 1) {
		neuerIndex = 0;
	}

	springeZuEintrag(neuerIndex);
}

function springeZuEintrag(neuerIndex) {
	indikatoren[aktuellerIndex].classList.remove("aktiv");
	slides[aktuellerIndex].classList.remove("aktiv");

	indikatoren[neuerIndex].classList.add("aktiv");
	slides[neuerIndex].classList.add("aktiv");

	aktuellerIndex = neuerIndex;
	letzteAktualisierung = new Date();
}

function automatischWeiterschalten() {
	const vergangeneZeit = new Date() - letzteAktualisierung;

	// Schalte nur noch weiter, wenn nicht pausiert ist
	if (!pausiert && vergangeneZeit >= 3000) {
		umschalten(1);
	}
}

setInterval(automatischWeiterschalten, 500);

// Neue Funktionen zum Ändern des Pause-Status

function pauseButtonGeklickt() {
	if (pausiert) {
		pauseBeenden();
	} else {
		pausieren();
	}
}

function pausieren() {
	// Ändere den Wert des pausiert-booleans
	pausiert = true;

	// Ändere den Text des Buttons
	document.querySelector(".slideshow-buttons .pause-button").innerHTML = "WEITER";
}

function pauseBeenden() {
	// Ändere den Wert des pausiert-booleans
	pausiert = false;

	// Ändere den Text des Buttons
	document.querySelector(".slideshow-buttons .pause-button").innerHTML = "PAUSE";
}

// Event Listener für den Pause-Button, damit beim Klick die pauseButtonGeklickt-Funktion aufgerufen wird
document.querySelector(".slideshow-buttons .pause-button").addEventListener("click", pauseButtonGeklickt);

// Event Listener für den slideshow-behaelter-behaelter, damit beim Darüberfahren mit der Maus die pausieren-Funktion aufgerufen wird
document.querySelector(".slideshow-behaelter-behaelter").addEventListener("mouseenter", pausieren);

// Event Listener für den slideshow-behaelter-behaelter, damit beim Verlassen des Bereiches mit der Maus die pauseBeenden-Funktion aufgerufen wird
document.querySelector(".slideshow-behaelter-behaelter").addEventListener("mouseleave", pauseBeenden);
