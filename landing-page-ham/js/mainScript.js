'use strict';

window.addEventListener('load', function() {

    /*var sectionHeader = document.getElementById("header");
    var sectionHome = document.getElementById("home");
    var sectionServices = document.getElementById("services");
    var sectionPortfolio = document.getElementById("portfolio");
    var sectionAbout = document.getElementById("about");
    var sectionNews = document.getElementById("news");
    var sectionContacts = document.getElementById("contacts");

    var logoButton = document.querySelector(".logo-button");
    var topMenu = document.querySelectorAll(".top-menu > ul > li > a");
    var sliderButton = document.querySelector(".slider-button");*/

    var topMenu = document.querySelector(".top-menu");
    var topMenuItems = document.querySelectorAll(".top-menu > ul > li > a");
    var faBars = document.querySelector(".fa-bars");


    /*function windowResizeHandler() {
        if (window.outerWidth < 992) {
            topMenu.style.display = "none";
        }
        else {
            topMenu.style.display = "inline-block";
        }

    }

    window.addEventListener('resize', windowResizeHandler);*/

    function faBarsHandler() {
        if (getComputedStyle(topMenu).display != "none") {
            topMenu.style.display = "none";
        }
        else {
            topMenu.style.display = "inline-block";
        }

    }

    faBars.addEventListener('click', faBarsHandler);


});

