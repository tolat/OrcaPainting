

var pics = ["CP2", "Jim2", "Peck", "Sandy", "Betty", "CP3"]
var body = document.getElementsByTagName("BODY")[0];

function setBackground() {
	var i = Math.floor((Math.random() * 10) % pics.length);
	body.style.backgroundImage = "url(BackgroundImages/" + pics[i] + ".jpg";
}

function centerSlide() {
	var slide = document.getElementsByTagName("IMG")[0];
	var w = window.innerWidth;
	var h = window.innerHeight;
	slide.style.height = h - 20 + "px";
	slide.style.marginLeft = "-" + (slide.offsetWidth / 2) + "px";
	slide.style.marginTop = "-" + (slide.offsetHeight / 2) + "px";
}

var slides = ["Turner", "Jim", "Peck", "Sandy", "Betty", "Werker", "Vladena", "CP1", "CP2", "CP3",
	"CP4", "CP5", "Engineer", "Lee", "Li", "Gma"]
var index = 0;
function setSlide(i) {
	slide.src = "MainPics/" + slides[i] + ".jpg";
}


function nextSlide() {
	index = (index + 1) % slides.length;
	setSlide(index);
	centerSlide();
}

function prevSlide() {
	index = (index - 1) % slides.length;
	if (index == -1) {
		index = slides.length - 1;
	}
	setSlide(index);
	centerSlide();
}

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
function onLoad() {
	if (isMobile) {
		window.location.href = "http://orcapainting.com/oldSite/index.html";
	}
}











