'use strict';

window.addEventListener('load', function() {
    // global variables - statuses
    var scrollFuncTimer,
        SCROLL_STEP = 100,
        busyFlag = false,
        portfolioIconCounterBusyFlag = false,
        portfolioFirstScroll = true,
        inputNameStatus = false,
        inputEmailStatus = false,
        inputTextStatus = false;

    var serviceIitemText0 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceIitemText1 = "Ut enim ad minim veniam, quis nostrud exercitation ullamco" +
            " laboris nisi ut aliquip ex ea commodo consequat.",
        serviceIitemText2 = "Duis aute irure dolor in reprehenderit in voluptate velit" +
            " esse cillum dolore eu fugiat nulla pariatur.",
        serviceIitemText3 = "Excepteur sint occaecat cupidatat non proident," +
            " sunt in culpa qui officia deserunt mollit anim id est laborum.",
        serviceIitemTextArr = [
            serviceIitemText0,
            serviceIitemText1,
            serviceIitemText2,
            serviceIitemText3
        ];

    var sectionHeader = document.getElementById("header"),
        sectionHome = document.getElementById("home"),
        sectionServices = document.getElementById("services"),
        sectionPortfolio = document.getElementById("portfolio"),
        sectionAbout = document.getElementById("about"),
        sectionNews = document.getElementById("news"),
        sectionContacts = document.getElementById("contacts");

    var logoButton = document.querySelector(".logo-button"),
        topMenu = document.querySelectorAll(".top-menu > ul > li > a"),
        sliderButton = document.querySelector(".slider-button");

    var servicesItems = document.querySelectorAll(".service-icon-img"),
        getNowButton = document.querySelector(".get-now");

    var portfolioMenuBtns = document.querySelectorAll(".portfolio-menu-btn"),
        portfolioContainer = document.querySelector(".portfolio-cont"),
        portfolioIconCounters = document.querySelectorAll(".portfolio-icon-counter");

    var aboutIconSocialBtns = document.querySelectorAll(".about-icon-social-btns");

    var newsFeed = document.querySelector(".news-feed"),
        newsTemplate = document.querySelector(".news-template");

    // var inputName = document.querySelector("input[type=\"text\"]");
    var inputName = document.querySelector(".input-name"),
        inputEmail = document.querySelector(".input-email"),
        inputText = document.querySelector(".input-text"),
        inputSubmitBtn = document.querySelector(".input-submit-btn");

    var footerButton = document.querySelector(".footer-btn");

    // --- main code ---

    scrollWindowHandler(); // initial call!!!

    // ***************** !!! NEWS script!!! **************( //

    var JsonNews;

    /*var JsonNews = [{"id":1,"text":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.","date":"8/5/2016"},
     {"id":2,"text":"Aenean lectus.","date":"12/26/2015"},
     {"id":3,"text":"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.","date":"8/6/2016"},
     {"id":4,"text":"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.","date":"4/5/2016"},
     {"id":5,"text":"Suspendisse accumsan tortor quis turpis.","date":"6/25/2016"},
     {"id":6,"text":"Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","date":"1/24/2016"},
     {"id":7,"text":"Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.","date":"1/6/2016"},
     {"id":8,"text":"Nunc rhoncus dui vel sem. Sed sagittis.","date":"5/30/2016"},
     {"id":9,"text":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.","date":"2/23/2016"},
     {"id":10,"text":"Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","date":"5/5/2016"}];
     NewsAddFromFile();*/

    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "../landing-page-ket/files/data.json", true);
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
        NewsAddFromFile();
    }


    function monthDecoder(monthNumber) {
        var monthString = "";

        switch (monthNumber) {
            case 0:
                monthString = "January";
                break;
            case 1:
                monthString = "February";
                break;
            case 2:
                monthString = "March";
                break;
            case 3:
                monthString = "April";
                break;
            case 4:
                monthString = "May";
                break;
            case 5:
                monthString = "June";
                break;
            case 6:
                monthString = "July";
                break;
            case 7:
                monthString = "August";
                break;
            case 8:
                monthString = "September";
                break;
            case 9:
                monthString = "October";
                break;
            case 10:
                monthString = "Novemver";
                break;
            case 11:
                monthString = "December";
                break;
            default:
                break;
        }

        return monthString;
    }

    function NewsAddFromFile() {
        var NewsArray = [],
            tempDate;

        for (var i = 0; i < JsonNews.length; i++) {
            tempDate = new Date(JsonNews[i].date);
            NewsArray[i] = newsTemplate.cloneNode(true);
            NewsArray[i].setAttribute("data-news-index", JsonNews[i].id );
            NewsArray[i].querySelector(".news-number").innerText = tempDate.getDate();
            NewsArray[i].querySelector(".news-month").innerText = monthDecoder(tempDate.getMonth());
            NewsArray[i].querySelector(".news-text").innerText = JsonNews[i].text;
            NewsArray[i].querySelector(".read-more-btn").setAttribute("href", "news.html?id=" + JsonNews[i].id);
            newsFeed.appendChild(NewsArray[i]);
        }
        newsTemplate.remove();
    }

    function scrollFunc(startPos, stopPos, step) {
        var epsilon = 0.1,
            step_ms = 10,
            deltaScroll = (stopPos - startPos) / step;

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
            var prevActiveItem = document.querySelector(".active-section"),
                stopPos = sectionHome.offsetTop;

            busyFlag = true;
            prevActiveItem.classList.remove("active-section");
            this.classList.add("active-section");
            this.style.textDecoration = "none";
            // event.target.classList.add("active-section");
            // this.style.textDecoration = "none";


            switch (this.getAttribute("href")) {
                case "#home":
                    stopPos = sectionHome.offsetTop;
                    break;
                case "#services":
                    stopPos = sectionServices.offsetTop;
                    break;
                case "#portfolio":
                    stopPos = sectionPortfolio.offsetTop;
                    break;
                case "#about":
                    stopPos = sectionAbout.offsetTop;
                    break;
                case "#news":
                    stopPos = sectionNews.offsetTop;
                    break;
                case "#contacts":
                    stopPos = sectionContacts.offsetTop;
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

    function getNowButtonHandler() {
        if (!busyFlag) {
            busyFlag = true;
            // this.offsetTop
            scrollFunc(
                scrollY,
                sectionContacts.offsetTop - sectionHeader.clientHeight,
                SCROLL_STEP
            )
        }
    }

    function sliderButtonHandler() {
        if (!busyFlag) {
            busyFlag = true;
            // this.offsetTop
            scrollFunc(
                scrollY,
                sectionPortfolio.offsetTop - sectionHeader.clientHeight,
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

    function activeServiceHandler(event){
        var prevActiveService = document.querySelector(".service-active"),
            serviceItemText = document.querySelector(".service-item-text");

        prevActiveService.classList.remove("service-active");
        event.target.parentNode.lastElementChild.classList.add("service-active");
        serviceItemText.innerText = serviceIitemTextArr[+this.dataset.serviceNumber];
    }

    function myFadeIn(elementDOM, timeStep){
        var tempOpacity = 0;
        var localTimer = setInterval(
            function() {
                tempOpacity += 1;
                if (tempOpacity <= 100) {
                    elementDOM.style.opacity = String(tempOpacity / 100);
                }
                else {
                    clearInterval(localTimer);
                }
            },
            timeStep
        );
    }

    function changePortfolioGalleryImgsProperties(itemsArray) {
        for (var i = 0; i < itemsArray.length; i++ ) {
            itemsArray[i].style.display = "inline-block";
            itemsArray[i].style.opacity = "0";
            myFadeIn(itemsArray[i], 5);
        }
    }

    function portfolioMenuHandler(event){
        if (!event.target.classList.contains("portfolio-menu-btn-active")) {
            var prevActiveItem = document.querySelector(".portfolio-menu-btn-active"),
                portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-img");

            prevActiveItem.classList.remove("portfolio-menu-btn-active");
            this.classList.add("portfolio-menu-btn-active");

            // disable all first, then will turn on
            for (var i = 0; i < portfolioGalleryImgs.length; i++) {
                portfolioGalleryImgs[i].style.display = "none";
            }
            // now determine what to turn on
            if (this.classList.contains("portfolio-all")) {
                portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-img");
                changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
            }
            else if (this.classList.contains("portfolio-quadr")) {
                portfolioGalleryImgs = document.querySelectorAll(".quadr-img");
                changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
            }
            else if (this.classList.contains("portfolio-auto")) {
                portfolioGalleryImgs = document.querySelectorAll(".auto-img");
                changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
            }
            else if (this.classList.contains("portfolio-nature")) {
                portfolioGalleryImgs = document.querySelectorAll(".nature-img");
                changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
            }
        }
    }

    function portfolioIconCounterHandler() {

        if (!portfolioIconCounterBusyFlag) {
            portfolioIconCounterBusyFlag = true;

            var step = 30,
                timeStep = 100,
                countFuncTimer = [];

            for (var i = 0; i < portfolioIconCounters.length; i++) {
                (function (i) {
                    var deltaCount = +portfolioIconCounters[i].dataset.portfolioNumber / step;
                    var localCount = 0;
                    portfolioIconCounters[i].innerText = "0";
                    countFuncTimer[i] = setInterval(
                        function () {
                            if (localCount + deltaCount >= +portfolioIconCounters[i].dataset.portfolioNumber) {
                                localCount = +portfolioIconCounters[i].dataset.portfolioNumber;
                                clearInterval(countFuncTimer[i]);
                                portfolioIconCounterBusyFlag = false;
                            }
                            else {
                                localCount += deltaCount;
                            }
                            localCount = Math.round(localCount);
                            // portfolioIconCounters[i].innerText = String(localCount);
                            portfolioIconCounters[i].innerText = localCount.toLocaleString();
                        },
                        timeStep
                    );
                })(i)
            }
        }
    }

    function aboutIconSocialBtnsHandler() {
        this.querySelector(".icon-facebook").firstElementChild.setAttribute("src", "images/icon_facebook_2.png");
        this.querySelector(".icon-twitter").firstElementChild.setAttribute("src", "images/icon_twitter_2.png");
        this.querySelector(".icon-google").firstElementChild.setAttribute("src", "images/icon_google_2.png");
        this.querySelector(".icon-dribble").firstElementChild.setAttribute("src", "images/icon_dribble_2.png");
    }

    function aboutIconSocialBtnsHandler2() {
        this.querySelector(".icon-facebook").firstElementChild.setAttribute("src", "images/icon_facebook_1.png");
        this.querySelector(".icon-twitter").firstElementChild.setAttribute("src", "images/icon_twitter_1.png");
        this.querySelector(".icon-google").firstElementChild.setAttribute("src", "images/icon_google_1.png");
        this.querySelector(".icon-dribble").firstElementChild.setAttribute("src", "images/icon_dribble_1.png");
    }

    // var readMoreBtns = document.querySelectorAll(".read-more-btn");

    function isFormValidate() {
        if (inputNameStatus && inputEmailStatus && inputTextStatus) {
            inputSubmitBtn.removeAttribute("disabled");
        }
        else {
            inputSubmitBtn.setAttribute("disabled", "disabled");
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

        alert("Input is CORRECT !\nThe data will be sent to the server !");
    }

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
                (document.documentElement.scrollTop  + tempOffset);

        if ( (currentPosition > sectionHome.offsetTop) && (currentPosition < sectionHome.offsetTop + sectionHome.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenu[0].classList.add("active-section");
            // window.location.hash = "/#home";
        }
        else if ( (currentPosition > sectionServices.offsetTop) && (currentPosition < sectionServices.offsetTop + sectionServices.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenu[1].classList.add("active-section");
            // window.location.hash = "/#services";
        }
        else if ( (currentPosition > sectionPortfolio.offsetTop) && (currentPosition < sectionPortfolio.offsetTop + sectionPortfolio.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenu[2].classList.add("active-section");
            // window.location.hash = "/#portfolio";
        }
        else if ( (currentPosition > sectionAbout.offsetTop) && (currentPosition < sectionAbout.offsetTop + sectionAbout.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenu[3].classList.add("active-section");
            // window.location.hash = "/#about";
        }
        else if ( (currentPosition > sectionNews.offsetTop) && (currentPosition < sectionNews.offsetTop + sectionNews.offsetHeight) ) {
            prevActiveItem.classList.remove("active-section");
            topMenu[4].classList.add("active-section");
            // window.location.hash = "/#news";
        }
        else if ( (currentPosition > sectionContacts.offsetTop)  ) {
            prevActiveItem.classList.remove("active-section");
            topMenu[5].classList.add("active-section");
            // window.location.hash = "/#contacts";
        }

        if ( (currentPosition > portfolioContainer.offsetTop) && (currentPosition < portfolioContainer.offsetTop + portfolioContainer.offsetHeight) ) {
            if (portfolioFirstScroll) {
                portfolioFirstScroll = false;
                portfolioIconCounterHandler();
            }
        }
    }

// ********************************************************
    for (var i = 0; i < topMenu.length; i++ ) {
        topMenu[i].addEventListener('click', activeSectionHandler);
    }
    logoButton.addEventListener('click', logoButtonHandler);
    getNowButton.addEventListener('click', getNowButtonHandler);
    sliderButton.addEventListener('click', sliderButtonHandler);
    for (i = 0; i < servicesItems.length; i++ ) {
        servicesItems[i].addEventListener('click', activeServiceHandler);
    }
    for (i = 0; i < portfolioMenuBtns.length; i++ ) {
        portfolioMenuBtns[i].addEventListener('click', portfolioMenuHandler);
    }
    portfolioContainer.addEventListener('click', portfolioIconCounterHandler);
    for (i = 0; i < aboutIconSocialBtns.length; i++ ) {
        aboutIconSocialBtns[i].addEventListener('mouseover', aboutIconSocialBtnsHandler);
    }
    for (i = 0; i < aboutIconSocialBtns.length; i++ ) {
        aboutIconSocialBtns[i].addEventListener('mouseleave', aboutIconSocialBtnsHandler2);
    }
    inputName.addEventListener('keyup', inputNameHandler);
    inputEmail.addEventListener('keyup', inputEmailHandler);
    inputText.addEventListener('keyup', inputTextHandler);
    inputSubmitBtn.addEventListener('click', inputSubmitBtnHandler);
    footerButton.addEventListener('click', footerButtonHandler);

    window.addEventListener('scroll', scrollWindowHandler);

    <!--PRELOADER !!!-->
    setTimeout(function() {
        $('#preloader').fadeOut('slow', function() {});
    }, 2000);

});

