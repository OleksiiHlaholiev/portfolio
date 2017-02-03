/**
 * Created by Glalex on 01.02.2017.
 */
'use strict';

window.addEventListener('load', function() {

	// ******************** GLOBAL VARIABLES ****************************
	var SCROLL_STEP = 100,
		scrollFuncTimer,
		userTimoutTimer,
		SLIDER_PROTECT_DELAY = 1000,
		SLIDER_AUTO_DELAY = 3000,
		SLIDER_USER_TIMEOUT = 2000,
		sliderBusyFlag = false,
		userActiveControlFlag = false,
		busyFlag = false;

	var backToTopBtn = document.querySelector(".back_to_top"),
		sectionHeader = document.getElementById("header"),
		sectionPortfolio = document.getElementById("portfolio"),
		subSectionCompanyAims = document.querySelector(".company_aims");

	var mainMenu = document.querySelector(".main_menu"),
		menuTrigerBtn = document.querySelector(".menu_triger");

	var slider = document.querySelector(".slider"),
		sliderBtnLeft = document.querySelector(".fa-angle-left"),
		sliderBtnRight = document.querySelector(".fa-angle-right"),
		sliderItems = document.querySelectorAll(".slider-item"),
		sliderPaginationBtns = document.querySelectorAll(".pagination-btn");

	// --------------------------- MAIN CODE --------------------------------------

	scrollWindowHandler(); // initial call!!!

	// initial call
	var launchAutoSliderTimer = setTimeout(
		function readyGo() {
			sliderRotate("right");
			launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
		},
		SLIDER_AUTO_DELAY
	);

	// ************************* FUNCTIONS ***************************

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
					} else {
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

	function myFadeIn(elementDOM, timeStep) {
		var tempOpacity = 0;
		var localTimer = setInterval(
			function () {
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

	function myFadeOut(elementDOM, timeStep) {
		var tempOpacity = 100;
		var localTimer = setInterval(
			function () {
				tempOpacity -= 1;
				if (tempOpacity >= 0) {
					elementDOM.style.opacity = String(tempOpacity / 100);
				} else {
					clearInterval(localTimer);
					elementDOM.style.display = "none";
				}
			},
			timeStep
		);
	}

	function changeSliderPaginationBtn(indexCurActive) {
		var prevActivePaginationBtn = document.querySelector(".slider-nav-list li .active");

		if (prevActivePaginationBtn.classList.contains("active")) {
			prevActivePaginationBtn.classList.remove("active");
		}

		sliderPaginationBtns[indexCurActive].classList.add("active");
	}

	function sliderRotate(direction) {
		if (!sliderBusyFlag) {
			sliderBusyFlag = true;
			var deltaX,
				sliderWidth = slider.clientWidth,
				temp,
				localSliderProtectTimer,
				indexCurActive = 1,
				sliderBorderLeft = -20,
				sliderBorderRight = 60;

			if (direction == "left") {
				deltaX = 100 / 5;
			} else if (direction == "right") {
				deltaX = -100 / 5;
			} else {
				deltaX = -100 / 5; // default: direction = "right"
			}

			for (var i = 0; i < sliderItems.length; i++) {
				temp = getComputedStyle(sliderItems[i]).left;
				temp = Number(temp.replace("px", "")) * 100 / sliderWidth + deltaX;
				sliderItems[i].style.transition = "all 1s";
				if (!Math.round(temp)) {
					temp = 0;
				}

				if (direction == "left" && temp > sliderBorderRight) {
					temp = sliderBorderLeft;
					sliderItems[i].style.transition = "none";
				} else if (direction == "right" && temp < sliderBorderLeft) {
					temp = sliderBorderRight;
					sliderItems[i].style.transition = "none";
				}

				if (temp == 0) {
					//indexCurActive = +sliderItems[i].getAttribute("data-current-index");
					indexCurActive = i;
				}
				temp += "%";
				sliderItems[i].style.left = temp;
			}

			// try to fix slider bug !!!
			if (sliderItems[0].style.left == sliderItems[1].style.left ||
				sliderItems[0].style.left == sliderItems[2].style.left ||
				sliderItems[0].style.left == sliderItems[3].style.left ||
				sliderItems[0].style.left == sliderItems[4].style.left ||
				sliderItems[1].style.left == sliderItems[2].style.left ||
				sliderItems[1].style.left == sliderItems[3].style.left ||
				sliderItems[1].style.left == sliderItems[4].style.left ||
				sliderItems[2].style.left == sliderItems[3].style.left ||
				sliderItems[2].style.left == sliderItems[4].style.left ||
				sliderItems[3].style.left == sliderItems[4].style.left) {
				// set initial positions
				// alert("This is slider bug!!!");
				sliderItems[0].style.left = "-20%";
				sliderItems[1].style.left = "0%";
				sliderItems[2].style.left = "20%";
				sliderItems[3].style.left = "40%";
				sliderItems[4].style.left = "60%";
			}

			changeSliderPaginationBtn(indexCurActive);

			localSliderProtectTimer = setTimeout(
				function () {
					sliderBusyFlag = false;
				},
				SLIDER_PROTECT_DELAY
			);
		}
	}

	// ****************************************************************

	// **********************  EVENT HANDLERS *************************

	function scrollWindowHandler(event) {
		var	tempOffset = 2 * sectionHeader.clientHeight,
			currentPosition = document.body.scrollTop ?
								(document.body.scrollTop + tempOffset) :
								(document.documentElement.scrollTop + tempOffset);

		if (currentPosition > sectionPortfolio.offsetTop + subSectionCompanyAims.offsetTop) {
			if (!backToTopBtn.classList.contains("back_to_top_visible")) {
				backToTopBtn.classList.add("back_to_top_visible");
				// backToTopBtn.style.display = "block";
			}

		} else {
			if (backToTopBtn.classList.contains("back_to_top_visible")) {
				backToTopBtn.classList.remove("back_to_top_visible");
				// backToTopBtn.style.display = "none";
			}
		}
	}

	function menuTrigerBtnHandler() {
		mainMenu.classList.toggle("show_menu");
	}

	function backToTopBtnHandler(event) {
		event.preventDefault();
		if (!busyFlag) {
			busyFlag = true;
			scrollFunc(
				pageYOffset,
				sectionPortfolio.offsetTop,
				SCROLL_STEP
			)
		}
	}

	function launchFiniteStateMachine() {
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

	function sliderBtnHandler(event) {
		userActiveControlFlag = true;
		clearTimeout(userTimoutTimer);
		clearTimeout(launchAutoSliderTimer);

		if (event.target.classList.contains("fa-angle-left")) {
			sliderRotate("left");
		} else {
			sliderRotate("right");
		}

		launchFiniteStateMachine();
	}

	function sliderPaginationBtnHandler(event) {

		if (!this.classList.contains("active")) {
			var prevActivePaginationBtn = document.querySelector(".slider-nav-list li .active");

			if (prevActivePaginationBtn.classList.contains("active")) {
				prevActivePaginationBtn.classList.remove("active");
			}

			this.classList.add("active");
			var targetSliderIndex = +this.getAttribute("data-current-index");

			userActiveControlFlag = true;
			clearTimeout(userTimoutTimer);
			clearTimeout(launchAutoSliderTimer);

			launchAutoSliderTimer = setTimeout(
				function readyGo() {
					sliderRotate("right");
					launchAutoSliderTimer = setTimeout(readyGo, SLIDER_PROTECT_DELAY);
					if (sliderItems[targetSliderIndex].style.left == "0%") {
						clearTimeout(launchAutoSliderTimer);
						// launch finite-state-machine again
						launchFiniteStateMachine();
					}
				},
				0
			);
		}

	}

	// ************************************************************************************

	// ***************** REGISTER EVENT HANDLERS *******************

	menuTrigerBtn.addEventListener('click', menuTrigerBtnHandler);
	backToTopBtn.addEventListener('click', backToTopBtnHandler);

	sliderBtnLeft.addEventListener('click', sliderBtnHandler);
	sliderBtnRight.addEventListener('click', sliderBtnHandler);

	for (var i = 0; i < sliderPaginationBtns.length; i++) {
		sliderPaginationBtns[i].addEventListener('click', sliderPaginationBtnHandler);
	}

	window.addEventListener('scroll', scrollWindowHandler);


});
