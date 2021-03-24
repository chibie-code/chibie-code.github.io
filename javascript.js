const lines = document.querySelectorAll(".fade-in");
const sections = document.querySelectorAll("section");
const options = {
    threshold: 1,
    rootMargin: "75% 0% 10% 0%",
};

$(document).ready(() => {
    $(".hero-title").addClass("hero-title-grow");
    /*$('#nav-menu').addClass("sidebar-hide-menu");
                                $('#nav-menu').removeClass("sidebar-show-menu");
                              $('#overlay').addClass("overlay-hide");*/

    $("#close-nav").click(() => {
        console.log("Close Clicked!");
        $("#nav-menu").removeClass("sidebar-show-menu");
        $("#nav-menu").addClass("sidebar-hide-menu");
        $("#overlay").removeClass("overlay-show");
        $("#overlay").addClass("overlay-hide");
    });

    $("#open-nav").click(() => {
        console.log("Open Clicked!");
        $("#nav-menu").addClass("sidebar-show-menu");
        $("#nav-menu").removeClass("sidebar-hide-menu");
        $("#overlay").addClass("overlay-show");
        $("#overlay").removeClass("overlay-hide");
    });
});

const lineToggle = (entry) => {
    if (entry.target.id === "welcome-section") {
        document.querySelector(".line1").classList.add("show-line");
        document.querySelector(".line2").classList.remove("show-line");
        document.querySelector(".line3").classList.remove("show-line");
    } else if (entry.target.id === "projects") {
        document.querySelector(".line2").classList.add("show-line");
        document.querySelector(".line1").classList.remove("show-line");
        document.querySelector(".line3").classList.remove("show-line");
    } else {
        document.querySelector(".line3").classList.add("show-line");
        document.querySelector(".line2").classList.remove("show-line");
        document.querySelector(".line1").classList.remove("show-line");
    }
};

/*
const navToggle = (entry) => {
    if (entry.target.id === "contact" || entry.target.id === "welcome-section") {
        document.querySelector("#navbar").classList.remove("navbar-opaque");
        document.querySelector("#navbar").classList.add("navbar-transparent");
    } else {
        document.querySelector("#navbar").classList.add("navbar-transparent");
        // document.querySelector("#navbar").classList.add("navbar-opaque");
    }
};
*/

const titleBoxAnim = (entry) => {
    if (entry.target.id === "welcome-section") {
        document.querySelector(".title-box").classList.add("title-box-anim");
    } else {
        document.querySelector(".title-box").classList.remove("title-box-anim");
    }
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    let previousY = 0;
    let previousRatio = 0;

    entries.forEach((entry) => {
        console.log("ID: " + entry.target.id);
        document.querySelector(".sec-span").innerHTML = ": " + entry.target.id;
        entry.target.classList.add("appear");
        lineToggle(entry);
        navToggle(entry);
        // appearOnScroll.unobserve(entry.target);

        if (!entry.isIntersecting) {
            entry.target.classList.remove("appear");
            // appearOnScroll.unobserve(entry.target);
            return;
        }
        const currentY = entry.boundingClientRect.y;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        // Scrolling down/up
        if (currentY < previousY) {
            if (currentRatio > previousRatio && isIntersecting) {
                console.log("Scrolling up enter " + entry.target.id);
                lineToggle(entry);
                navToggle(entry);
            } else {
                console.log("Scrolling up leave " + entry.target.id);
                lineToggle(entry);
                navToggle(entry);
            }
        } else if (currentY > previousY && isIntersecting) {
            if (currentRatio < previousRatio) {
                console.log("Scrolling down leave " + entry.target.id);
                lineToggle(entry);
                navToggle(entry);
            } else {
                console.log("Scrolling down enter " + entry.target.id);
                lineToggle(entry);
                navToggle(entry);
            }
        }

        previousY = currentY;
        previousRatio = currentRatio;
    });
}, options);

sections.forEach((section) => {
    appearOnScroll.observe(section);
});