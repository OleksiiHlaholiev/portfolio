'use strict';

window.addEventListener('load', function() {
    var forEach = Array.prototype.forEach;

    var SCROLL_STEP = 100,
        scrollFuncTimer,
        busyFlag = false,
        teamGalleryFirstScroll = true,
        aboutSkillsFirstScroll = true,
        teamGalleryCounterBusyFlag = false,
        JsonNews,
        loadMoreBtnClickedCnt = 0,
        numberNewsToLoad = 8,
        inputNameStatus = false,
        inputEmailStatus = false,
        inputTextStatus = false;

    var sectionHeader = document.getElementById("header"),
        sectionHome = document.getElementById("home"),
        sectionService = document.getElementById("service"),
        sectionAbout = document.getElementById("about"),
        sectionWork = document.getElementById("work"),
        sectionTeam = document.getElementById("team"),
        sectionNews = document.getElementById("news"),
        sectionFeedback = document.getElementById("feedback"),
        sectionContact = document.getElementById("contact");

    var topMenu = document.querySelector(".top-menu"),
        topMenuItems = document.querySelectorAll(".top-menu > ul > li > a"),
        faBars = document.querySelector(".fa-bars");

    var logoButton = document.querySelector(".logo-button"),
        exploreButtons = document.querySelectorAll(".explore-button"),
        purchaseButtons = document.querySelectorAll(".purchase-button"),
        footerButton = document.querySelector(".footer-button");

    var serviceMenuItems = document.querySelectorAll(".service-menu > ul > li"),
        serviceItemContainers = document.querySelectorAll(".service-item-container");

    var aboutContainer = document.querySelector(".about-container"),
        aboutMenuItems = document.querySelectorAll(".about-menu > li"),
        aboutItemContainers = document.querySelectorAll(".about-item-container"),
        skillProgressContainers = document.querySelectorAll(".skill-progress");

    var workMenuItems = document.querySelectorAll(".work-menu > li");

    var teamGallery = document.querySelector(".team-gallery"),
        teamGalleryItemCounters = document.querySelectorAll(".team-item-counter");

    var newsContainer = document.querySelector(".news-cont"),
        newsTemplate = document.querySelector(".news-template"),
        loadMoreBtn = document.querySelector(".load-more-btn");

    // var inputName = document.querySelector("input[type=\"text\"]");
    var inputName = document.querySelector(".input-name"),
        inputEmail = document.querySelector(".input-email"),
        inputText = document.querySelector(".input-text"),
        inputSubmitBtn = document.querySelector(".submit-btn"),
        inputContactContent = document.querySelector(".input-contact-content");


    // --------------------------- MAIN CODE --------------------------------------

    scrollWindowHandler(); // initial call!!!

    // ***************** !!! NEWS script!!! **************( //

    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "../landing-page-ham/files/data.json", true);
    httpRequest.onreadystatechange = OnRequestStateChange;
    httpRequest.send(null);

    function OnRequestStateChange()
    {
        if (httpRequest.readyState != 4)
            return;
        if (httpRequest.status != 200)
            return;
        //alert(httpRequest.responseText);
        JsonNews = JSON.parse(httpRequest.responseText);
        NewsAddFromFile(0, numberNewsToLoad);
        loadMoreBtnClickedCnt++;
        newsTemplate.remove();
    }


    function monthDecoder(monthNumber) {
        var monthString = "";

        switch (monthNumber) {
            case 0:
                monthString = "Jan";
                break;
            case 1:
                monthString = "Feb";
                break;
            case 2:
                monthString = "Mar";
                break;
            case 3:
                monthString = "Apr";
                break;
            case 4:
                monthString = "May";
                break;
            case 5:
                monthString = "Jun";
                break;
            case 6:
                monthString = "Jul";
                break;
            case 7:
                monthString = "Aug";
                break;
            case 8:
                monthString = "Sep";
                break;
            case 9:
                monthString = "Oct";
                break;
            case 10:
                monthString = "Nov";
                break;
            case 11:
                monthString = "Dec";
                break;
            default:
                break;
        }

        return monthString;
    }

    function NewsAddFromFile(startIndex, stopIndex) {
        var NewsArray = [];
        var tempDate;

        for (var i = startIndex; i < stopIndex; i++) {
            if (i < JsonNews.length) {
                tempDate = new Date(JsonNews[i].date);
                NewsArray[i] = newsTemplate.cloneNode(true);
                NewsArray[i].setAttribute("data-news-index", JsonNews[i].id);
                NewsArray[i].querySelector(".news-date").innerText = tempDate.getDate();
                NewsArray[i].querySelector(".news-month").innerText = monthDecoder(tempDate.getMonth());
                NewsArray[i].querySelector(".news-text").innerText = "Amazing Post #" + JsonNews[i].id;
                NewsArray[i].querySelector(".read-more-btn").setAttribute("href", "news.html?id=" + JsonNews[i].id);
                newsContainer.appendChild(NewsArray[i]);
            }
        }
    }

    // -----------------------------------------------------------------------------

    function scrollFunc(startPos, stopPos, step) {
        var epsilon = 0.1,
            step_ms = 10,
            deltaScroll = (stopPos - startPos) / step;

        if (Math.abs(deltaScroll) > epsilon) {
            scrollFuncTimer = setInterval(
                function () {
                    // document.body.scrollTop
                    if (deltaScroll == 0 ||
                        (deltaScroll > 0 && pageYOffset >= stopPos) ||
                        (deltaScroll < 0 && pageYOffset <= stopPos)) {
                        clearInterval(scrollFuncTimer);
                        busyFlag = false;
                    }
                    else {
                        scrollBy(0, deltaScroll);
                    }
                },
                step_ms
            );
        }
        else {
            busyFlag = false;
        }
    }

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
            scrollFunc(
                scrollY,
                sectionHome.offsetTop,
                SCROLL_STEP
            )
        }
    }

    function faBarsHandler() {
        if (getComputedStyle(topMenu).display != "none") {
            topMenu.style.display = "";
        }
        else {
            topMenu.style.display = "inline-block";
        }

    }

    function activeServiceMenuHandler(event){
        var prevActiveService = document.querySelector(".active-service-item");
        prevActiveService.classList.remove("active-service-item");
        event.target.classList.add("active-service-item");

        // serviceItemContainers.dataset.serviceNumber
        var prevActiveServiceCont = document.querySelector(".active-service-item-cont");
        prevActiveServiceCont.classList.remove("active-service-item-cont");
        serviceItemContainers[+event.target.dataset.serviceNumber].classList.add("active-service-item-cont");
    }

    function activeAboutMenuHandler(event){
        var prevActiveAbout = document.querySelector(".active-about-item");
        prevActiveAbout.classList.remove("active-about-item");
        event.target.classList.add("active-about-item");

        // serviceItemContainers.dataset.serviceNumber
        var prevActiveAboutCont = document.querySelector(".active-about-item-cont");
        prevActiveAboutCont.classList.remove("active-about-item-cont");
        aboutItemContainers[+event.target.dataset.aboutNumber].classList.add("active-about-item-cont");
    }

    function aboutSkillsRunningHandler() {
        forEach.call(skillProgressContainers, function(item) {
            item.style.width = item.dataset.skillWidth + "%";
        });
    }

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
            for (i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-graphic")) {
            portfolioGalleryImgs = document.querySelectorAll(".graphic-img");
            for (i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-web")) {
            portfolioGalleryImgs = document.querySelectorAll(".web-img");
            for (i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-landing")) {
            portfolioGalleryImgs = document.querySelectorAll(".landing-img");
            for (i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
        else if (this.classList.contains("portfolio-wordpress")) {
            portfolioGalleryImgs = document.querySelectorAll(".wordpress-img");
            for (i = 0; i < portfolioGalleryImgs.length; i++ ) {
                portfolioGalleryImgs[i].style.display = "inline-block";
            }
        }
    }

    // team gallery counters
    function teamGalleryItemCounterHandler() {

        if (teamGalleryCounterBusyFlag == false) {
            teamGalleryCounterBusyFlag = true;

            var step = 30,
                timeStep = 100,
                countFuncTimer = [];

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

    function loadMoreBtnHandler() {
        if (loadMoreBtnClickedCnt * numberNewsToLoad < JsonNews.length) {
            NewsAddFromFile(loadMoreBtnClickedCnt * numberNewsToLoad, (loadMoreBtnClickedCnt + 1) * numberNewsToLoad);
            loadMoreBtnClickedCnt++;
        }
    }

    // ************************************************************************************

    function isFormValidate() {
        if (inputNameStatus && inputEmailStatus && inputTextStatus) {
            inputSubmitBtn.removeAttribute("disabled");
        }
        else {
            inputSubmitBtn.setAttribute("disabled", "disabled");
            // alert("Input is INCORRECT! Please, check the input fields!");
        }
    }

    function inputNameHandler() {
        if (!inputName.value.length) {
            inputNameStatus = false;
            inputName.nextElementSibling.style.display = "block";
            inputName.nextElementSibling.innerText = "No data entered !"
        }
        else {
            // if ( (/[a-zA-Z]/.test(inputName.value[inputName.value.length - 1])) )
            if ( (/[a-zA-Z]/.test(inputName.value)) ) {
                inputNameStatus = true;
                inputName.nextElementSibling.style.display = "none";
            }
            else {
                inputNameStatus = false;
                inputName.nextElementSibling.style.display = "block";
                inputName.nextElementSibling.innerText = "Invalid character(s), only English letters !"
            }
        }
        isFormValidate();
    }

    function inputEmailHandler() {
        if (!inputEmail.value.length) {
            inputEmailStatus = false;
            inputEmail.nextElementSibling.style.display = "block";
            inputEmail.nextElementSibling.innerText = "No email entered !"
        }
        else {
            if ( (/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(inputEmail.value)) ) {
                inputEmailStatus = true;
                inputEmail.nextElementSibling.style.display = "none";
            }
            else {
                inputEmailStatus = false;
                inputEmail.nextElementSibling.style.display = "block";
                inputEmail.nextElementSibling.innerText = "Incorrect input of email !"
            }
            isFormValidate();
        }
    }

    function inputTextHandler() {
        if (!inputText.value.length) {
            inputTextStatus = false;
            inputText.nextElementSibling.style.display = "block";
            inputText.nextElementSibling.innerText = "No text entered !"
        }
        else {
            if ( inputText.value.length >= 20 ) {
                inputTextStatus = true;
                inputText.nextElementSibling.style.display = "none";
            }
            else {
                inputTextStatus = false;
                inputText.nextElementSibling.style.display = "block";
                inputText.nextElementSibling.innerText = "Too short message (minimum 20 characters) !"
            }
        }
        isFormValidate();
    }

    function inputSubmitBtnHandler(event) {
        event.preventDefault();
        alert("The data will be sent to the server !");
        inputContactContent.reset();

    }
    // ************************************************************************************
    function scrollWindowHandler(event) {
        // alert("Scroll!!!");

        // var prevActiveItem = document.querySelector(".active-section");
        // prevActiveItem.classList.remove("active-section");
        // this.style.textDecoration = "none";
        // document.documentElement.scrollTop - Mozilla works, Chrome - NO
        // document.body.scrollTop - Mozilla - NO, Chrome - Yes
        var prevActiveItem = document.querySelector(".active-section"),
            tempOffset = 2 * sectionHeader.clientHeight,
            currentPosition = document.body.scrollTop ?
                (document.body.scrollTop + tempOffset) :
                (document.documentElement.scrollTop + tempOffset);

        if ( (currentPosition > sectionHome.offsetTop) &&
            (currentPosition < sectionHome.offsetTop + sectionHome.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[0].classList.add("active-section");
        }
        else if ( (currentPosition > sectionService.offsetTop) &&
            (currentPosition < sectionService.offsetTop + sectionService.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[1].classList.add("active-section");
        }
        else if ( (currentPosition > sectionAbout.offsetTop) &&
            (currentPosition < sectionAbout.offsetTop + sectionAbout.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[2].classList.add("active-section");
        }
        else if ( (currentPosition > sectionWork.offsetTop) &&
            (currentPosition < sectionWork.offsetTop + sectionWork.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[3].classList.add("active-section");
        }
        else if ( (currentPosition > sectionTeam.offsetTop) &&
            (currentPosition < sectionTeam.offsetTop + sectionTeam.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[4].classList.add("active-section");
        }
        else if ( (currentPosition > sectionNews.offsetTop) &&
            (currentPosition < sectionNews.offsetTop + sectionNews.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[5].classList.add("active-section");
        }
        else if ( (currentPosition > sectionFeedback.offsetTop) &&
            (currentPosition < sectionFeedback.offsetTop + sectionFeedback.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[6].classList.add("active-section");
        }
        else if ( (currentPosition > sectionContact.offsetTop)  ) {
            prevActiveItem.classList.remove("active-section");
            topMenuItems[7].classList.add("active-section");
        }

        if ( (currentPosition > sectionTeam.offsetTop + teamGallery.offsetTop) &&
            (currentPosition <  sectionTeam.offsetTop + teamGallery.offsetTop + teamGallery.offsetHeight) ) {
            if (teamGalleryFirstScroll) {
                teamGalleryFirstScroll = false;
                teamGalleryItemCounterHandler();
            }
        }
        // skillContainers
        if ( (currentPosition > sectionAbout.offsetTop + aboutContainer.offsetTop) &&
            (currentPosition <  sectionAbout.offsetTop + aboutContainer.offsetTop + aboutContainer.offsetHeight) ) {
            if (aboutSkillsFirstScroll) {
                aboutSkillsFirstScroll = false;
                aboutSkillsRunningHandler();
            }
        }
    }

    /*for (var i = 0; i < topMenuItems.length; i++ ) {
        topMenuItems[i].addEventListener('click', activeSectionHandler);
    }*/
    forEach.call(topMenuItems, function(item) {
        item.addEventListener('click', activeSectionHandler);
    });
    logoButton.addEventListener('click', logoButtonHandler);
    forEach.call(exploreButtons, function(item) {
        item.addEventListener('click', exploreButtonsHandler);
    });
    forEach.call(purchaseButtons, function(item) {
        item.addEventListener('click', purchaseButtonsHandler);
    });
    footerButton.addEventListener('click', footerButtonHandler);
    faBars.addEventListener('click', faBarsHandler);
    forEach.call(serviceMenuItems, function(item) {
        item.addEventListener('click', activeServiceMenuHandler);
    });
    aboutContainer.addEventListener('click', aboutSkillsRunningHandler);
    forEach.call(aboutMenuItems, function(item) {
        item.addEventListener('click', activeAboutMenuHandler);
    });
    forEach.call(workMenuItems, function(item) {
        item.addEventListener('click', workMenuHandler);
    });
    teamGallery.addEventListener('click', teamGalleryItemCounterHandler);
    loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

    inputName.addEventListener('keyup', inputNameHandler);
    inputEmail.addEventListener('keyup', inputEmailHandler);
    inputText.addEventListener('keyup', inputTextHandler);
    inputSubmitBtn.addEventListener('click', inputSubmitBtnHandler);

    window.addEventListener('scroll', scrollWindowHandler);

});

