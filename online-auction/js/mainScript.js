'use strict';

// **** polyfills for IE

/*if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}*/
// ****************************************

// window.addEventListener('load', function() {
$(function() {
	// ******************** GLOBAL VARIABLES ****************************
	var SCROLL_STEP = 100,
		scrollFuncTimer,
		userTimoutTimer,
		SLIDER_PROTECT_DELAY = 1000,
		SLIDER_AUTO_DELAY = 3000,
		SLIDER_USER_TIMEOUT = 2000,
		sliderBusyFlag = false,
		userActiveControlFlag = false,
		inputNameStatus = false,
		inputEmailStatus = false,
		inputTextStatus = false;

	var slider = document.querySelector(".slider"),
		sliderBtnLeft = document.querySelector(".fa-angle-left"),
		sliderBtnRight = document.querySelector(".fa-angle-right"),
		sliderItems = document.querySelectorAll(".slider-item");

	var portfolioNavigationItems = document.querySelectorAll(".portfolio-navigation > li");


	var auctionItemContainers = document.querySelectorAll(".auction-item-cont"),
		auctionItemViewerCont = document.querySelector(".auction-item-viewer-cont"),
		closeAuctionViewerBtn = document.querySelector(".auction-item-viewer-cont .close-btn"),
		addNewLotBtn = document.querySelector(".add-new-lot"),
		addItemViewerContainer = document.querySelector(".add-item-viewer-cont"),
		closeAddItemViewerBtn = document.querySelector(".add-item-viewer .close-btn");

	var inputName = document.querySelector(".inputs-container .input-name"),
		inputEmail = document.querySelector(".input-email"),
		inputText = document.querySelector(".input-text"),
		inputSubmitBtn = document.querySelector(".submit-btn"),
		inputContactContent = document.querySelector(".input-contact-content");

	// *********************************************************************

	// initial call
	var launchAutoSliderTimer = setTimeout(
		function readyGo() {
			sliderRotate("right");
			launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
		},
		SLIDER_AUTO_DELAY
	);
    // ****************************************************************

	// ************************* FUNCTIONS ***************************
	function sliderRotate(direction) {
		if (!sliderBusyFlag) {
			sliderBusyFlag = true;
			var deltaX,
				sliderWidth = slider.clientWidth,
				temp,
				localSliderProtectTimer,
				sliderBorderLeft = -25,
				sliderBorderRight = 25;

			if (direction == "left"){
				deltaX = 100 / 4;
			} else if (direction == "right"){
				deltaX = -100 / 4;
			} else {
				deltaX = -100 / 4; // default: direction = "right"
			}

			for (var i = 0; i < sliderItems.length; i++){
				temp = getComputedStyle(sliderItems[i]).left;
				temp = Number(temp.replace("px", "")) * 100 / sliderWidth + deltaX;
				sliderItems[i].style.transition = "left 1s";
				if (!Math.round(temp)) {
					temp = 0;
				}

				if (direction == "left" && temp > sliderBorderRight){
					temp = sliderBorderLeft;
					sliderItems[i].style.transition = "none";
				} else if (direction == "right" && temp < sliderBorderLeft) {
					temp = sliderBorderRight;
					sliderItems[i].style.transition = "none";
				}

				temp += "%";
				sliderItems[i].style.left = temp;
			}

			// try to fix slider bug !!!
			if ( sliderItems[0].style.left == sliderItems[1].style.left ||
				sliderItems[0].style.left == sliderItems[2].style.left ||
				sliderItems[1].style.left == sliderItems[2].style.left ) {
				// set initial positions
				// alert("This is slider bug!!!");
				sliderItems[0].style.left = "-25%";
				sliderItems[1].style.left = "0%";
				sliderItems[2].style.left = "25%";
			}


			localSliderProtectTimer = setTimeout(
				function () {
					sliderBusyFlag = false;
				},
				SLIDER_PROTECT_DELAY
			);
		}
	}

	function myFadeIn(elementDOM, timeStep){
		var tempOpacity = 0;
		var localTimer = setInterval(
			function() {
				tempOpacity += 1;
				if (tempOpacity <= 100) {
					elementDOM.style.opacity = String(tempOpacity / 100);
				} else {
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

	function isFormValidate(inputButton, status1, status2, status3) {
		if (status1 && status2 && status3) {
			inputButton.removeAttribute("disabled");
		} else {
			inputButton.setAttribute("disabled", "disabled");
			// alert("Input is INCORRECT! Please, check the input fields!");
		}
	}

	// ****************************************************************

	// **********************  EVENT HANDLERS *************************

	function sliderBtnLeftHandler() {
		userActiveControlFlag = true;
		clearTimeout(userTimoutTimer);
		clearInterval(launchAutoSliderTimer);
		sliderRotate("left");

		userTimoutTimer = setTimeout(
			function () {
				launchAutoSliderTimer = setTimeout(
					function readyGo() {
						userActiveControlFlag = false;
						sliderRotate("right");
						launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
					},
					SLIDER_AUTO_DELAY
				);
			},
			SLIDER_USER_TIMEOUT
		);
	}

	function sliderBtnRightHandler() {
		userActiveControlFlag = true;
		clearTimeout(userTimoutTimer);
		clearInterval(launchAutoSliderTimer);
		sliderRotate("right");

		userTimoutTimer = setTimeout(
			function () {
				launchAutoSliderTimer = setTimeout(
					function readyGo() {
						userActiveControlFlag = false;
						sliderRotate("right");
						launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
					},
					SLIDER_AUTO_DELAY
				);
			},
			SLIDER_USER_TIMEOUT
		);
	}

	function portfolioNavigationHandler(event){
		if (!event.target.classList.contains("active-category")) {
			var prevActiveItem = document.querySelector(".active-category"),
				portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-item");

			prevActiveItem.classList.remove("active-category");
			this.classList.add("active-category");

			// disable all first, then will turn on
			for (var i = 0; i < portfolioGalleryImgs.length; i++) {
				portfolioGalleryImgs[i].style.display = "none";
			}
			// now determine what to turn on
			if (this.classList.contains("portfolio-all")) {
				portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-item");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			} else if (this.classList.contains("portfolio-auto")) {
				portfolioGalleryImgs = document.querySelectorAll(".auto-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			} else if (this.classList.contains("portfolio-moto")) {
				portfolioGalleryImgs = document.querySelectorAll(".moto-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			} else if (this.classList.contains("portfolio-boat")) {
				portfolioGalleryImgs = document.querySelectorAll(".boat-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			} else if (this.classList.contains("portfolio-painting")) {
				portfolioGalleryImgs = document.querySelectorAll(".painting-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			}
		}
	}

	function auctionItemContainersHandler() {
		auctionItemViewerCont.style.display = "block";
	}

	function closeAuctionViewerBtnHandler (event) {
		auctionItemViewerCont.style.display = "none";
		event.stopPropagation(); // to avoid inherit click events
	}

	function addNewLotBtnHandler() {
		addItemViewerContainer.style.display = "block";
	}

	function closeAddItemViewerBtnHandler (event) {
		addItemViewerContainer.style.display = "none";
		event.stopPropagation(); // to avoid inherit click events
	}

	// ****************************************************************
	// Disable scroll zooming and bind back the click event
	function onMapMouseleaveHandler () {
		var that = this;

		that.addEventListener('click', onMapClickHandler);
		that.removeEventListener('mouseleave', onMapMouseleaveHandler);
		that.querySelector('iframe').style.pointerEvents = "none";
	}

	function onMapClickHandler () {
		var that = this;

		// Disable the click handler until the user leaves the map area
		that.removeEventListener('click', onMapClickHandler);

		// Enable scrolling zoom
		that.querySelector('iframe').style.pointerEvents = "auto";

		// Handle the mouse leave event
		that.addEventListener('mouseleave', onMapMouseleaveHandler);
	}
	// ****************************************************************

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
			} else {
				inputNameStatus = false;
				inputName.nextElementSibling.style.display = "block";
				inputName.nextElementSibling.innerText = "Invalid character(s), only English letters !"
			}
		}
		isFormValidate(inputSubmitBtn, inputNameStatus, inputEmailStatus, inputTextStatus);
	}

	function inputEmailHandler() {
		if (!inputEmail.value.length) {
			inputEmailStatus = false;
			inputEmail.nextElementSibling.style.display = "block";
			inputEmail.nextElementSibling.innerText = "No email entered !"
		} else {
			if ( (/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(inputEmail.value)) ) {
				inputEmailStatus = true;
				inputEmail.nextElementSibling.style.display = "none";
			} else {
				inputEmailStatus = false;
				inputEmail.nextElementSibling.style.display = "block";
				inputEmail.nextElementSibling.innerText = "Incorrect input of email !"
			}
			isFormValidate(inputSubmitBtn, inputNameStatus, inputEmailStatus, inputTextStatus);
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
			} else {
				inputTextStatus = false;
				inputText.nextElementSibling.style.display = "block";
				inputText.nextElementSibling.innerText = "Too short message (minimum 20 characters) !"
			}
		}
		isFormValidate(inputSubmitBtn, inputNameStatus, inputEmailStatus, inputTextStatus);
	}

	function inputSubmitBtnHandler(event) {
		event.preventDefault();
		alert("The data will be sent to the server !");

		inputContactContent.reset();
		inputNameStatus = inputEmailStatus = inputTextStatus = false;
		inputSubmitBtn.setAttribute("disabled", "disabled");

	}
	// ************************************************************************************

	// ***************** REGISTER EVENT HANDLERS *******************
	var i;

	sliderBtnLeft.addEventListener('click', sliderBtnLeftHandler);
	sliderBtnRight.addEventListener('click', sliderBtnRightHandler);

	for (i = 0; i < portfolioNavigationItems.length; i++) {
		portfolioNavigationItems[i].addEventListener('click', portfolioNavigationHandler);
	}

	for (i = 0; i < auctionItemContainers.length; i++) {
		auctionItemContainers[i].addEventListener('click', auctionItemContainersHandler)
	}

	closeAuctionViewerBtn.addEventListener('click', closeAuctionViewerBtnHandler);
	addNewLotBtn.addEventListener('click', addNewLotBtnHandler);
	closeAddItemViewerBtn.addEventListener('click', closeAddItemViewerBtnHandler);

	inputName.addEventListener('keyup', inputNameHandler);
	inputEmail.addEventListener('keyup', inputEmailHandler);
	inputText.addEventListener('keyup', inputTextHandler);
	inputSubmitBtn.addEventListener('click', inputSubmitBtnHandler);


	// Enable map zooming with mouse scroll when the user clicks the map
	$('.map-cont')[0].addEventListener('click', onMapClickHandler);

	<!--PRELOADER !!!-->
	/*setTimeout(function() {
	 $('#preloader').fadeOut('slow', function() {});
	 }, 2000);*/

});

