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

window.addEventListener('load', function() {

	var SCROLL_STEP = 100,
		scrollFuncTimer,
		userTimoutTimer,
		SLIDER_PROTECT_DELAY = 1000,
		SLIDER_AUTO_DELAY = 3000,
		SLIDER_USER_TIMEOUT = 2000,
		sliderBusyFlag = false,
		userActiveControlFlag = false;

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

	// initial call
	var launchAutoSliderTimer = setTimeout(
		function readyGo() {
			sliderRotate("right");
			launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
		},
		SLIDER_AUTO_DELAY
	);


    // ****************************************************************

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

			// try to catch slider bug !!!
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

	function sliderBtnLeftHandler() {
		userActiveControlFlag = true;
		clearTimeout(userTimoutTimer);
		clearInterval(launchAutoSliderTimer);
		sliderRotate("left");

		userTimoutTimer = setTimeout(
			function () {
				/*launchAutoSliderTimer = setInterval(
				 function () {
				 userActiveControlFlag = false;
				 sliderRotate("right");
				 },
				 SLIDER_AUTO_DELAY
				 );*/
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
				/*launchAutoSliderTimer = setInterval(
				 function () {
				 userActiveControlFlag = false;
				 sliderRotate("right");
				 },
				 SLIDER_AUTO_DELAY
				 );*/
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

	// PORTFOLIO SWITCHES

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
			}
			else if (this.classList.contains("portfolio-auto")) {
				portfolioGalleryImgs = document.querySelectorAll(".auto-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			}
			else if (this.classList.contains("portfolio-moto")) {
				portfolioGalleryImgs = document.querySelectorAll(".moto-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			}
			else if (this.classList.contains("portfolio-boat")) {
				portfolioGalleryImgs = document.querySelectorAll(".boat-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			}
			else if (this.classList.contains("portfolio-painting")) {
				portfolioGalleryImgs = document.querySelectorAll(".painting-img");
				changePortfolioGalleryImgsProperties(portfolioGalleryImgs);
			}
		}
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

	// *****************  EVENT HANDLERS *******************

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


	// Enable map zooming with mouse scroll when the user clicks the map
	$('.map-cont')[0].addEventListener('click', onMapClickHandler);

	<!--PRELOADER !!!-->
	/*setTimeout(function() {
	 $('#preloader').fadeOut('slow', function() {});
	 }, 2000);*/

});

