// Declare global variables 
var slideCount;
var currentSlide;
var galleryIntervalId;
var swiper;

// Fades in the current slide
function showSlide() {
    var slideStr = currentSlide.toString();
    document.getElementById("s" + slideStr).style.opacity = 1;
}

// Hides all inactive slides
function hideRest() {
    var slides = document.getElementsByClassName("gallerySlide");
    for (var i = 0; i < slideCount; i++) {
        if (i + 1 != currentSlide) {
            slides[i].style.opacity = 0;
        }
    }
}

// Displays the previous slide in the Gallery
function reverseSlide() {
    currentSlide += 2;
    advanceGallery();
}

// Displays the next slide in the Gallery
function advanceGallery() {
    if (currentSlide == slideCount + 1) {
        currentSlide = 1;
    }
    if (currentSlide == slideCount + 2) {
        currentSlide = 2;
    }
    showSlide();
    hideRest();
    if (currentSlide == 1) { currentSlide = slideCount + 1 }
    currentSlide--;
}

// Sets the correct view and styles on document load
// Also starts the slideshow and fades out the loading screen
function start() {
    if (window.matchMedia("only screen and (max-device-width: 800px)").matches || window.matchMedia("(max-width: 800px)").matches) {
        largeToSmallDesktopView();
    }
    slideCount = document.getElementsByClassName("gallerySlide").length;
    currentSlide = slideCount;
    document.getElementById("loadingScreen").style.opacity = 0;
    setTimeout(function () {
        var ls = document.getElementById("loadingScreen");
        ls.style.opacity = 0;
        ls.style.display = "none";
    }, 1100);
    hideRest();
    currentSlide--;
    galleryIntervalId = setInterval(advanceGallery, 8000);
}

// Shows the Desktop contact form
function showDesktopForm() {
    /* Add focusForm class to body */
    document.body.classList.add("focusForm");

    var dFormContainer = document.getElementById("desktopFormContainer");

    /* hide mainsection and button container */
    document.getElementById("mainSection").style.opacity = 0;
    document.getElementById("buttonContainer").style.opacity = 0;

    /* show and expand to size */
    dFormContainer.style.display = "flex";
    dFormContainer.style.zIndex = 1;
    dFormContainer.style.opacity = 1;
    setTimeout(function expand() {
        dFormContainer.style.width = "100%";
        dFormContainer.style.height = "100%";
        dFormContainer.style.marginBottom = 0;
    }, 300);

    /* fade in the form */
    var dForm = document.getElementById("desktopForm");
    setTimeout(function fadeIn() {
        dForm.style.opacity = 1;
    }, 600);

}

// Hides the Desktop contact form
function hideDesktopForm() {
    /* Remove focusForm class to body */
    document.body.classList.remove("focusForm");

    var dFormContainer = document.getElementById("desktopFormContainer");

    /* fade out the form */
    var dForm = document.getElementById("desktopForm");
    dForm.style.opacity = null;

    /* shrink down and hide contactForm */
    setTimeout(function shrink() {
        dFormContainer.style.width = null;
        dFormContainer.style.height = null;
        dFormContainer.style.marginBottom = null;
    }, 500);
    setTimeout(function fadeOut() {
        dFormContainer.style.opacity = null;
    }, 1000);
    setTimeout(function hideContainer() {
        dFormContainer.style.zIndex = null;
        dFormContainer.style.display = null;
    }, 1500);

    /* show mainsection and button container */
    setTimeout(function showMainContent() {
        document.getElementById("mainSection").style.opacity = null;
        document.getElementById("buttonContainer").style.opacity = null;
    }, 500);
}

// Scrolls to where the contact form can be seen
function scrollToContactForm() {
    var elmnt = document.getElementById("mobileFormHeading");
    if (window.matchMedia("only screen and (max-device-width: 800px)").matches) {
        hideGalleryMobile();
        elmnt.scrollIntoView();
    } else {
        if (document.body.classList.contains("galleryFocus")) {
            hideGallery();
            setTimeout(function () {
                elmnt.scrollIntoView();
            }, 750);
        } else {
            elmnt.scrollIntoView();
        }
    }
}

// Scrolls to top..
function scrollToTop() {
    window.scrollTo(0, 0);
}

// Routes to either the mobile or desktp show Gallery funcitons
function showGallery() {
    /* If case 1: view is mobile - go to showGalleryMobile. Else scroll to top if necessary then 
    go to showGalleryHelper */
    if (window.matchMedia("only screen and (max-device-width: 800px)").matches) {
        showGalleryMobile();
    } else {
        /* If window is not close to top, scroll to top first */
        if (window.scrollY >= 40) {
            scrollToTop();
            setTimeout(function () {
                showGalleryHelper();
            }, 400);
        } else {
            showGalleryHelper();
        }
    }
}

// Shows the Gallery in desktop view
function showGalleryHelper() {
    /* Exit if gallery is already visible */
    if (document.body.classList.contains("galleryFocus")) {
        return;
    }

    /* Set body to have class 'galleryFocus' so custom styles can apply for each media query */
    document.body.classList.add("galleryFocus");

    /* Get elements */
    var gallery = document.getElementById("gallery");
    var bPrev = document.getElementById("prevSlide");
    var bNext = document.getElementById("nextSlide");
    var bExit = document.getElementById("exitGalleryButton");

    var mainSection = document.getElementById("mainSection");
    var buttonContainer = document.getElementById("buttonContainer");
    var cContainer = document.getElementById("contentContainer");

    /* Hide non-gallery elements */
    mainSection.style.opacity = 0;
    buttonContainer.style.opacity = 0;
    cContainer.style.opacity = 0;
    setTimeout(function () {
        mainSection.style.display = "none";
        buttonContainer.style.display = "none";
        cContainer.style.display = "none";
    }, 750);

    /* Give 'gallery' transition styling so the gallery centers smoothly.
       Remove this styling once centering is complete */
    gallery.style.transition = "top 0.75s ease-in, height 0.75s ease-in, width 0.75s ease-in";
    setTimeout(function () {
        gallery.style.transition = null;
    }, 750);

    /* Stop gallery */
    clearInterval(galleryIntervalId);

    /* show prev and next buttons */
    bPrev.style.display = "unset";
    bNext.style.display = "unset";
    bExit.style.display = "unset";
    setTimeout(function () {
        bPrev.style.opacity = 1;
        bNext.style.opacity = 1;
        bExit.style.opacity = 1;
    }, 750);
}

// Hide the Gallery in desktop view
function hideGallery() {

    /*  If window is in mobile view, go to hideGalleryMobile() */
    if (window.matchMedia("only screen and (max-device-width: 800px)").matches) {
        hideGalleryMobile();
        return;
    }

    /* Remove 'galleryFocus' class from body after animations */
    document.body.classList.remove("galleryFocus");

    /* Get elements */
    var gallery = document.getElementById("gallery");
    var bPrev = document.getElementById("prevSlide");
    var bNext = document.getElementById("nextSlide");
    var bExit = document.getElementById("exitGalleryButton");

    var mainSection = document.getElementById("mainSection");
    var buttonContainer = document.getElementById("buttonContainer");
    var cContainer = document.getElementById("contentContainer");

    /* Hide gallery buttons */
    bPrev.style.opacity = null;
    bNext.style.opacity = null;
    bExit.style.opacity = null;
    setTimeout(function () {
        bPrev.style.display = null;
        bNext.style.display = null;
        bExit.style.display = null;
    }, 250);

    /* Give gallery transition styling so the gallery expands smoothly.
       Remove this styling once expansion is complete. */
    gallery.style.transition = "top 0.75s ease-in, height 0.75s ease-in, width 0.75s ease-in";
    setTimeout(function () {
        gallery.style.transition = null;
    }, 750);

    /* Reset gallery timer */
    galleryIntervalId = setInterval(advanceGallery, 8000);

    /* Reset non-gallery element styles */
    mainSection.style.display = null;
    buttonContainer.style.display = null;
    cContainer.style.display = null;
    setTimeout(function hideContainer() {
        mainSection.style.opacity = null;
        buttonContainer.style.opacity = null;
        cContainer.style.opacity = null;
    }, 250);
}

// Shows the Gallery in mobile view
function showGalleryMobile() {
    /* Close Gallery if Gallery is already visible */
    if (document.body.classList.contains("galleryFocus")) {
        hideGalleryMobile();
        return;
    }
    /* Set body to have class 'galleryFocus' so custom styles can apply for each media query */
    document.body.classList.add("galleryFocus");

    /* Hide default gallery */
    document.getElementById("gallery").style.display = "none";

    /* Show SwiperJS gallery */
    document.getElementById("swiperGallery").style.display = "flex";


    /* Initilize swiper if none is yet*/
    if (swiper == null) {
        swiper = new Swiper('.swiper-container', {
            spaceBetween: 80,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
        });
    }

    /* Stop gallery interval */
    clearInterval(galleryIntervalId);

    /* Turn Gallery button into a back button */
    var gButton = document.getElementById("navbarGalleryAccessText");
    gButton.innerHTML = "BACK";
}

// Hides the Gallery in mobile view
function hideGalleryMobile() {

    /* Reset gallery interval if gallery is active */
    if (document.body.classList.contains("galleryFocus")) {
        galleryIntervalId = setInterval(advanceGallery, 8000);
    }

    /* Turn Back button into Gallery button again */
    var gButton = document.getElementById("navbarGalleryAccessText");
    gButton.innerHTML = "GALLERY";

    /* Hide SwiperJS gallery */
    document.getElementById("swiperGallery").style.display = "none";

    /* Show default gallery */
    document.getElementById("gallery").style.display = null;

    /* Remove galleryFocus class from body */
    document.body.classList.remove("galleryFocus");
}

// Ensures styles are corrent when resizing dektop window from large to small
function largeToSmallDesktopView() {
    var fFocus = document.body.classList.contains("focusForm");

    /* Hide the large desktop form is it is active */
    if (fFocus) {
        hideDesktopForm();
        document.body.classList.add("focusForm");
    }

    /* Reset styles changed in small Dektop view */
    document.getElementById("mainSection").style.opacity = null;
    document.getElementById("buttonContainer").style.opacity = null;

    /* Apply correct classes and IDs to the Form so it becomes mobile */
    document.getElementById("desktopFormContainer").id = "mobileFormContainer";
    document.getElementById("desktopForm").id = "mobileForm";
    document.getElementById("desktopFormHeading").id = "mobileFormHeading";
    document.getElementById("backButton").style.display = "none";
    var fsButton = document.getElementById("formSubmitButton");

    /* Delay and then scroll to contact form if in desktop large to small transition */
    if (fFocus) {
        setTimeout(function () {
            scrollToContactForm();
        }, 1000);
    }

    /* Remove focusForm from classlist */
    document.body.classList.remove("focusForm");
}

// Ensures styles are corrent when resizing dektop window from small to large
function smallToLargeDesktopView() {
    /* Reset styles changed in small Dektop view */
    document.getElementById("mainSection").style.opacity = null;
    document.getElementById("buttonContainer").style.opacity = null;

    /* Apply correct classes and IDs to the Form so it becomes large desktop view */
    document.getElementById("mobileFormContainer").id = "desktopFormContainer";
    document.getElementById("mobileForm").id = "desktopForm";
    document.getElementById("mobileFormHeading").id = "desktopFormHeading";
    document.getElementById("backButton").style.display = null;
}

// Listener to handle the case where the desktop form is visible and the window is resized 
window.addEventListener("resize", function () {
    var smallDesktop = window.matchMedia("(max-width: 800px)").matches;
    var largeDesktop = window.matchMedia("(min-width: 800px)").matches;
    var mobile = window.matchMedia("only screen and (max-device-width: 800px)").matches;

    /* Style the transition between desktop to small desktop views when form is open */
    if (smallDesktop || mobile) {
        largeToSmallDesktopView();
    }
    else if (largeDesktop) {
        smallToLargeDesktopView();
    }
});

// Displays the thank you screen after form submission
function showThankyouScreen() {
    var tyScreen = document.getElementById("thankyouScreen");
    tyScreen.style.display = "flex";
    setTimeout(function () {
        tyScreen.style.opacity = 0;
    }, 3000);
    setTimeout(function () {
        tyScreen.style.display = null;
        tyScreen.style.opacity = null;
    }, 3750);
}

// Clears the user input in the contact form
function clearForm() {
    document.getElementById("inputName").value = null;
    document.getElementById("inputPhone").value = null;
    document.getElementById("inputEmail").value = null;
    document.getElementById("inputInquiry").value = null;
}

// Resets the form conditional on the view type (mobile or desktop)
function resetForm(isMobileView) {
    // Provide thankyou feedback after form submission
    if (isMobileView) {
        clearForm();
        alert("Thank you for contacting us! \n\n We'll get back to you as soon as possible.");
        scrollToTop();
    } else {
        showThankyouScreen();
        clearForm();
        hideDesktopForm();
    }
}

// Function to submit form without page refresh. Courtesy of: 'https://code-boxx.com/submit-form-without-refreshing-page/'
function fetchpost() {

    // Set a variable to remember if fomr is being submitted from mobile
    var isMobileView = (window.matchMedia("only screen and (max-device-width: 800px)").matches || window.matchMedia("(max-width: 800px)").matches);

    // (A) GET FORM DATA
    let data = new URLSearchParams();
    data.append("name", document.getElementById("inputName").value);
    data.append("phone", document.getElementById("inputPhone").value);
    data.append("email", document.getElementById("inputEmail").value);
    data.append("message", document.getElementById("inputInquiry").value);

    // (B) FETCH
    fetch("send_form.php", {
        method: 'post',
        body: data
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
    }).catch(function (error) {
        console.log(error)
    });

    resetForm(isMobileView);

    // (C) PREVENT HTML FORM SUBMIT
    return false;
}











