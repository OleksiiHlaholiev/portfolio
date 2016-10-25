'use strict';

window.addEventListener('load', function() {

    var sectionHeader = document.getElementById("header");
    var sectionHome = document.getElementById("home");
    var sectionService = document.getElementById("service");
    var sectionAbout = document.getElementById("about");
    var sectionWork = document.getElementById("work");
    var sectionTeam = document.getElementById("team");
    var sectionNews = document.getElementById("news");
    var sectionFeedback = document.getElementById("feedback");
    var sectionContact = document.getElementById("contact");

    var topMenu = document.querySelector(".top-menu");
    var topMenuItems = document.querySelectorAll(".top-menu > ul > li > a");
    var faBars = document.querySelector(".fa-bars");

    var logoButton = document.querySelector(".logo-button");
    var exploreButtons = document.querySelectorAll(".explore-button");
    var purchaseButtons = document.querySelectorAll(".purchase-button");
    var footerButton = document.querySelector(".footer-button");

    var serviceMenuItems = document.querySelectorAll(".service-menu > ul > li");
    var serviceItemContainers = document.querySelectorAll(".service-item-container");

    var workMenuItems = document.querySelectorAll(".work-menu > li");

    var aboutMenuItems = document.querySelectorAll(".about-menu > li");
    var aboutItemContainers = document.querySelectorAll(".about-item-container");

    var teamGallery = document.querySelector(".team-gallery");
    var teamGalleryItemCounters = document.querySelectorAll(".team-item-counter");


    // --- main code ---

    var scrollFuncTimer;
    var busyFlag = false;

    scrollWindowHandler(); // initial call!!!


    function scrollFunc(startPos, stopPos, step) {
        // var deltaScroll = (stopPos - Math.round(startPos)) / step;
        var epsilon = 0.1;
        var deltaScroll = (stopPos - startPos) / step;

        if (Math.abs(deltaScroll) > epsilon) {
            scrollFuncTimer = setInterval(
                function () {

                    // document.body.scrollTop
                    if (deltaScroll == 0 || (deltaScroll > 0 && pageYOffset >= stopPos) || (deltaScroll < 0 && pageYOffset <= stopPos)) {
                        clearInterval(scrollFuncTimer);
                        busyFlag = false;
                    }
                    else {
                        scrollBy(0, deltaScroll);
                    }
                },
                10
            );
        }
        else {
            busyFlag = false;
        }
    }

    var SCROLL_STEP = 100;

    function activeSectionHandler(event){
        event.preventDefault();

        if (!busyFlag) {
            busyFlag = true;
            var prevActiveItem = document.querySelector(".active-section");
            prevActiveItem.classList.remove("active-section");
            this.classList.add("active-section");
            this.style.textDecoration = "none";
            // event.target.classList.add("active-section");
            // this.style.textDecoration = "none";

            var stopPos = sectionHome.offsetTop;
            // this.getAttribute("href") == "contacts"
            // this.hash

            switch (this.getAttribute("href")) {
                case "#home":
                    stopPos = sectionHome.offsetTop;
                    break;
                case "#service":
                    stopPos = sectionService.offsetTop;
                    break;
                case "#about":
                    stopPos = sectionAbout.offsetTop;
                    break;
                case "#work":
                    stopPos = sectionWork.offsetTop;
                    break;
                case "#team":
                    stopPos = sectionTeam.offsetTop;
                    break;
                case "#news":
                    stopPos = sectionNews.offsetTop;
                    break;
                case "#feedback":
                    stopPos = sectionFeedback.offsetTop;
                    break;
                case "#contact":
                    stopPos = sectionContact.offsetTop;
                    break;
                default:
                    stopPos = sectionHome.offsetTop;
                    break;
            }

            if (stopPos == sectionHome.offsetTop)
                scrollFunc(
                    scrollY,
                    stopPos,
                    SCROLL_STEP
                );
            else
                scrollFunc(
                    scrollY,
                    stopPos - sectionHeader.clientHeight,
                    SCROLL_STEP
                );
        }
    }

    function logoButtonHandler(event) {
        event.preventDefault();
        if (!busyFlag) {
            busyFlag = true;
            scrollFunc(
                scrollY,
                sectionHome.offsetTop,
                SCROLL_STEP
            )
        }
    }

    function exploreButtonsHandler(event) {
        if (!busyFlag) {
            busyFlag = true;
            // this.offsetTop
            scrollFunc(
                scrollY,
                sectionWork.offsetTop - sectionHeader.clientHeight,
                SCROLL_STEP
            )
        }
    }

    function purchaseButtonsHandler(event) {
        if (!busyFlag) {
            busyFlag = true;
            // this.offsetTop
            scrollFunc(
                scrollY,
                sectionContact.offsetTop - sectionHeader.clientHeight,
                SCROLL_STEP
            )
        }
    }

    function footerButtonHandler(event) {
        event.preventDefault();
        if (!busyFlag) {
            busyFlag = true;
            // this.offsetTop
            scrollFunc(
                scrollY,
                sectionHome.offsetTop,
                SCROLL_STEP
            )
        }
    }

    for (var i = 0; i < topMenuItems.length; i++ ) {
        topMenuItems[i].addEventListener('click', activeSectionHandler);
    }

    logoButton.addEventListener('click', logoButtonHandler);
    for (var i = 0; i < exploreButtons.length; i++ ) {
        exploreButtons[i].addEventListener('click', exploreButtonsHandler);
    }
    for (var i = 0; i < purchaseButtons.length; i++ ) {
        purchaseButtons[i].addEventListener('click', purchaseButtonsHandler);
    }
    footerButton.addEventListener('click', footerButtonHandler);

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
            topMenu.style.display = "";
        }
        else {
            topMenu.style.display = "inline-block";
        }

    }

    faBars.addEventListener('click', faBarsHandler);

    // **************************************************

    function activeServiceMenuHandler(event){
        var prevActiveService = document.querySelector(".active-service-item");
        prevActiveService.classList.remove("active-service-item");
        event.target.classList.add("active-service-item");

        // serviceItemContainers.dataset.serviceNumber
        var prevActiveServiceCont = document.querySelector(".active-service-item-cont");
        prevActiveServiceCont.classList.remove("active-service-item-cont");
        serviceItemContainers[+event.target.dataset.serviceNumber].classList.add("active-service-item-cont");
    }

    for (var i = 0; i < serviceMenuItems.length; i++ ) {
        serviceMenuItems[i].addEventListener('click', activeServiceMenuHandler);
    }

    // **************************************************

    function activeAboutMenuHandler(event){
        var prevActiveAbout = document.querySelector(".active-about-item");
        prevActiveAbout.classList.remove("active-about-item");
        event.target.classList.add("active-about-item");

        // serviceItemContainers.dataset.serviceNumber
        var prevActiveAboutCont = document.querySelector(".active-about-item-cont");
        prevActiveAboutCont.classList.remove("active-about-item-cont");
        aboutItemContainers[+event.target.dataset.aboutNumber].classList.add("active-about-item-cont");
    }

    for (var i = 0; i < aboutMenuItems.length; i++ ) {
        aboutMenuItems[i].addEventListener('click', activeAboutMenuHandler);
    }

    // **************************************************

    function workMenuHandler(){
        var prevActiveItem = document.querySelector(".active-work-item");

        prevActiveItem.classList.remove("active-work-item");
        this.classList.add("active-work-item");

        var portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-img");
        // disable all first, then will turn on
        for (var i = 0; i < portfolioGalleryImgs.length; i++ ) {
            portfolioGalleryImgs[i].style.display = "none";
        }
        // now determine what to turn on
        if (this.classList.contains("portfolio-all")) {
            portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-img");
            for (var i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-graphic")) {
            portfolioGalleryImgs = document.querySelectorAll(".graphic-img");
            for (var i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-web")) {
            portfolioGalleryImgs = document.querySelectorAll(".web-img");
            for (var i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-landing")) {
            portfolioGalleryImgs = document.querySelectorAll(".landing-img");
            for (var i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-wordpress")) {
            portfolioGalleryImgs = document.querySelectorAll(".wordpress-img");
            for (var i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
    }

    for (var i = 0; i < workMenuItems.length; i++ ) {
        workMenuItems[i].addEventListener('click', workMenuHandler);
    }

    // **************************************************

    var teamGalleryCounterBusyFlag = false;

    // team gallery counters
    function teamGalleryItemCounterHandler() {

        if (teamGalleryCounterBusyFlag == false) {
            teamGalleryCounterBusyFlag = true;

            var step = 30;
            var timeStep = 100;
            var countFuncTimer = [];

            for (var i = 0; i < teamGalleryItemCounters.length; i++) {
                (function (i) {
                    var deltaCount = +teamGalleryItemCounters[i].dataset.teamNumber / step;
                    var localCount = 0;
                    teamGalleryItemCounters[i].innerText = "0";
                    countFuncTimer[i] = setInterval(
                        function () {
                            if (localCount + deltaCount >= +teamGalleryItemCounters[i].dataset.teamNumber) {
                                localCount = +teamGalleryItemCounters[i].dataset.teamNumber;
                                clearInterval(countFuncTimer[i]);
                                teamGalleryCounterBusyFlag = false;
                            }
                            else {
                                localCount += deltaCount;
                            }
                            localCount = Math.round(localCount);
                            teamGalleryItemCounters[i].innerText = String(localCount);
                        },
                        timeStep
                    );
                })(i)
            }
        }
    }

    teamGallery.addEventListener('click', teamGalleryItemCounterHandler);

    var teamGalleryFirstScroll = true;

    // *************************************************************
    function scrollWindowHandler(event) {
        // alert("Scroll!!!");

        // var prevActiveItem = document.querySelector(".active-section");
        // prevActiveItem.classList.remove("active-section");
        // this.style.textDecoration = "none";
        // document.documentElement.scrollTop - Mozilla works, Chrome - NO
        // document.body.scrollTop - Mozilla - NO, Chrome - Yes
        var prevActiveItem = document.querySelector(".active-section");
        var tempOffset = 2 * sectionHeader.clientHeight;
        var currentPosition = document.body.scrollTop ? (document.body.scrollTop + tempOffset) : (document.documentElement.scrollTop  + tempOffset);

        if ( (currentPosition > sectionHome.offsetTop) && (currentPosition < sectionHome.offsetTop + sectionHome.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[0].classList.add("active-section");
        }
        else if ( (currentPosition > sectionService.offsetTop) && (currentPosition < sectionService.offsetTop + sectionService.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[1].classList.add("active-section");
        }
        else if ( (currentPosition > sectionAbout.offsetTop) && (currentPosition < sectionAbout.offsetTop + sectionAbout.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[2].classList.add("active-section");
        }
        else if ( (currentPosition > sectionWork.offsetTop) && (currentPosition < sectionWork.offsetTop + sectionWork.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[3].classList.add("active-section");
        }
        else if ( (currentPosition > sectionTeam.offsetTop) && (currentPosition < sectionTeam.offsetTop + sectionTeam.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[4].classList.add("active-section");
        }
        else if ( (currentPosition > sectionNews.offsetTop) && (currentPosition < sectionNews.offsetTop + sectionNews.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[5].classList.add("active-section");
        }
        else if ( (currentPosition > sectionFeedback.offsetTop) && (currentPosition < sectionFeedback.offsetTop + sectionFeedback.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[6].classList.add("active-section");
        }
        else if ( (currentPosition > sectionContact.offsetTop)  ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[7].classList.add("active-section");
        }

        if ( (currentPosition > sectionTeam.offsetTop + teamGallery.offsetTop) && (currentPosition <  sectionTeam.offsetTop + teamGallery.offsetTop + teamGallery.offsetHeight) ) {
            if (teamGalleryFirstScroll) {
                teamGalleryFirstScroll = false;
                teamGalleryItemCounterHandler();
            }
        }
    }

    window.addEventListener('scroll', scrollWindowHandler);

});

