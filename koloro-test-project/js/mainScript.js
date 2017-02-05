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
		busyFlag = false,

		topImageFirstTypingFlag = true,
		infoHistoryFirstTypingFlag = true,
		infoAimFirstTypingFlag = true,
		infoSolutionFirstTypingFlag = true,
		secondImageFirstScrollFlag = true,
		thirdImageFirstScrollFlag = true,
		fourthImageFirstScrollFlag = true,
		conceptsInfoFirstTypingFlag = true,
		infoAverageFirstTypingFlag = true,
		infoResultFirstTypingFlag = true,
		summaryHeaderFirstTypingFlag = true,
		contactUsFormFirstTypingFlag = true,

		SYMBOL_TYPING_SPEED_MS = 5;

	var backToTopBtn = document.querySelector(".back_to_top"),
		sectionHeader = document.getElementById("header"),
		sectionPortfolio = document.getElementById("portfolio"),
		subSectionCompanyAims = document.querySelector(".company_aims");

	var topImage = document.querySelector(".top_image"),
		topTitle = document.querySelector(".top_title"),
		secondImage = document.querySelector(".second_image"),
		thirdImage = document.querySelector(".third_image"),
		fourthImage = document.querySelector(".fourth_image");

	var infoHistory = document.querySelector(".info_history"),
		infoAim = document.querySelector(".info_aim"),
		infoSolution = document.querySelector(".info_solution"),
		conceptsInfo = document.querySelector(".concepts_info"),
		infoAverage = document.querySelector(".info_average"),
		infoResult = document.querySelector(".info_result"),
		summaryHeader = document.querySelector(".summary_header"),
		contactUsForm = document.querySelector(".contact_us_form");

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
			sliderRotate("right", 1);
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

	function sliderRotate(direction, transitionTimeS) {
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
				sliderItems[i].style.transition = "all " + transitionTimeS + "s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

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
				transitionTimeS * 1000
			);
		}
	}

	function textTyping(textElement, buttonElement, speedTyping) {
		var tempTextStr = textElement.innerText,
			tempStr = "",
			i = 0;

		textElement.style.height = getComputedStyle(textElement).height;

		var textTypingTimer = setInterval(
			function () {
				tempStr += tempTextStr[i];
				textElement.innerText = tempStr;
				i++;
				if (i == tempTextStr.length) {
					clearInterval(textTypingTimer);
					if (buttonElement) {
						buttonElement.classList.add("animate_info_text");
					}
				}
			}, speedTyping);
	}

	function launchFiniteStateMachine() {
		userTimoutTimer = setTimeout(
			function () {
				launchAutoSliderTimer = setTimeout(
					function readyGo() {
						userActiveControlFlag = false;
						sliderRotate("right", 1);
						launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
					},
					SLIDER_AUTO_DELAY
				);
			},
			SLIDER_USER_TIMEOUT
		);
	}

	// ****************************************************************

	// **********************  EVENT HANDLERS *************************

	function scrollWindowHandler(event) {

		var	tempOffset = window.innerHeight / 3;

		if (window.innerHeight < 900) {
			tempOffset = window.innerHeight / 3;
		} else {
			tempOffset = window.innerHeight / 2;
		}

		// if (window.innerHeight < 600) {
		// 	tempOffset = 3 * sectionHeader.clientHeight;
		// } else if (window.innerHeight < 900) {
		// 	tempOffset = 6 * sectionHeader.clientHeight;
		// } else if (window.innerHeight < 1200){
		// 	tempOffset = 10 * sectionHeader.clientHeight;
		// } else {
		// 	tempOffset = 15 * sectionHeader.clientHeight;
		// }

		var	currentPosition = document.body.scrollTop ?
			(document.body.scrollTop + tempOffset) :
			(document.documentElement.scrollTop + tempOffset);

		if ( ((currentPosition) >= sectionPortfolio.offsetTop) &&
			((currentPosition) < sectionPortfolio.offsetTop + topImage.clientHeight)
		) {
			if (topImageFirstTypingFlag) {
				topImage.classList.add("animate_image");
				topTitle.classList.add("animate_top_title");

				topImageFirstTypingFlag = false;
			}
		} else if ( (currentPosition > (infoHistory.offsetTop - tempOffset)) &&
				(currentPosition < (infoHistory.offsetTop + infoHistory.clientHeight)) ) {
			if (infoHistoryFirstTypingFlag) {
				infoHistory.querySelector("h2").classList.add("animate_info_title");
				infoHistory.querySelector("p").classList.add("animate_info_text");
				textTyping(infoHistory.querySelector("p"), infoHistory.querySelector(".read_more_btn"), SYMBOL_TYPING_SPEED_MS);

				infoHistoryFirstTypingFlag = false;
			}
		} else if ((currentPosition > (infoAim.offsetTop - tempOffset)) &&
					(currentPosition < (infoAim.offsetTop + infoAim.clientHeight)) ) {
				if (infoAimFirstTypingFlag) {
					infoAim.querySelector("h2").classList.add("animate_info_title");
					infoAim.querySelector("p").classList.add("animate_info_text");
					textTyping(infoAim.querySelector("p"), infoAim.querySelector(".read_more_btn"), SYMBOL_TYPING_SPEED_MS);

					infoAimFirstTypingFlag = false;
				}
		} else if ((currentPosition > (infoSolution.offsetTop - tempOffset)) &&
			(currentPosition < (infoSolution.offsetTop + infoSolution.clientHeight)) ) {
				if (infoSolutionFirstTypingFlag) {
					infoSolution.querySelector("h2").classList.add("animate_info_title");
					infoSolution.querySelector("p").classList.add("animate_info_text");
					textTyping(infoSolution.querySelector("p"), infoSolution.querySelector(".read_more_btn"), SYMBOL_TYPING_SPEED_MS);

					infoSolutionFirstTypingFlag = false;
				}
		} else if ((currentPosition > (secondImage.parentNode.parentNode.offsetTop - tempOffset)) &&
			(currentPosition < (secondImage.parentNode.parentNode.offsetTop + secondImage.parentNode.parentNode.clientHeight)) ) {
				if (secondImageFirstScrollFlag) {
					secondImage.classList.add("animate_image");

					secondImageFirstScrollFlag = false;
				}
		} else if ((currentPosition > (thirdImage.parentNode.parentNode.offsetTop - tempOffset)) &&
			(currentPosition < (thirdImage.parentNode.parentNode.offsetTop + thirdImage.parentNode.parentNode.clientHeight)) ) {
			if (thirdImageFirstScrollFlag) {
				thirdImage.classList.add("animate_image");

				thirdImageFirstScrollFlag = false;
			}
		} else if ((currentPosition > (conceptsInfo.offsetTop - tempOffset)) &&
			(currentPosition < (conceptsInfo.offsetTop + conceptsInfo.clientHeight)) ) {
			if (conceptsInfoFirstTypingFlag) {
				conceptsInfo.querySelector("h2").classList.add("animate_concepts_info_title");
				conceptsInfo.querySelector("p").classList.add("animate_concepts_info_text");
				textTyping(conceptsInfo.querySelector("p", null, SYMBOL_TYPING_SPEED_MS));

				conceptsInfoFirstTypingFlag = false;
			}
		} else if ((currentPosition > (infoAverage.offsetTop - tempOffset)) &&
			(currentPosition < (infoAverage.offsetTop + infoAverage.clientHeight)) ) {
			if (infoAverageFirstTypingFlag) {
				infoAverage.querySelector("h2").classList.add("animate_info_title");
				infoAverage.querySelector("p").classList.add("animate_info_text");
				textTyping(infoAverage.querySelector("p"), infoAverage.querySelector(".read_more_btn"), SYMBOL_TYPING_SPEED_MS);

				infoAverageFirstTypingFlag = false;
			}
		} else if ((currentPosition > (fourthImage.parentNode.parentNode.offsetTop - tempOffset)) &&
			(currentPosition < (fourthImage.parentNode.parentNode.offsetTop + fourthImage.parentNode.parentNode.clientHeight)) ) {
			if (fourthImageFirstScrollFlag) {
				fourthImage.classList.add("animate_image");

				fourthImageFirstScrollFlag = false;
			}
		} else if ((currentPosition > (summaryHeader.parentNode.offsetTop - tempOffset)) &&
			(currentPosition < (summaryHeader.parentNode.offsetTop + summaryHeader.parentNode.clientHeight)) ) {
			if (summaryHeaderFirstTypingFlag) {
				summaryHeader.classList.add("animate_summary_header");
				textTyping(summaryHeader, null, 50);

				summaryHeaderFirstTypingFlag = false;
			}
		} else if ((currentPosition > (infoResult.offsetTop - tempOffset)) &&
			(currentPosition < (infoResult.offsetTop + infoResult.clientHeight)) ) {
			if (infoResultFirstTypingFlag) {
				infoResult.querySelector("h2").classList.add("animate_info_title");
				infoResult.querySelector("p").classList.add("animate_info_text");
				textTyping(infoResult.querySelector("p"), infoResult.querySelector(".read_more_btn"), SYMBOL_TYPING_SPEED_MS);

				infoResultFirstTypingFlag = false;
			}
		} else if ((currentPosition > (contactUsForm.offsetTop - tempOffset)) &&
			(currentPosition < (contactUsForm.offsetTop + contactUsForm.clientHeight)) ) {
			if (contactUsFormFirstTypingFlag) {
				contactUsForm.querySelector("h1").classList.add("animate_contact_us_header");
				textTyping(contactUsForm.querySelector("h1"), null, SYMBOL_TYPING_SPEED_MS);
				contactUsForm.querySelector("p").classList.add("animate_contact_us_content");
				contactUsForm.querySelector("button").classList.add("animate_submit_btn");

				contactUsFormFirstTypingFlag = false;
			}
		}

		// sectionHeader background: turn on / turn off
		if (currentPosition > sectionPortfolio.offsetTop + subSectionCompanyAims.offsetTop) {
			if (!sectionHeader.classList.contains("header-grey-bg")) {
				sectionHeader.classList.add("header-grey-bg");
			}
		} else {
			if (sectionHeader.classList.contains("header-grey-bg")) {
				sectionHeader.classList.remove("header-grey-bg");
			}
		}

		// backToTopBtn: turn on / turn off
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

	function sliderBtnHandler(event) {
		userActiveControlFlag = true;
		clearTimeout(userTimoutTimer);
		clearTimeout(launchAutoSliderTimer);

		if (event.target.classList.contains("fa-angle-left")) {
			sliderRotate("left", 1);
		} else {
			sliderRotate("right", 1);
		}

		launchFiniteStateMachine();
	}

	function sliderPaginationBtnHandler(event) {

		if (!this.classList.contains("active")) {
			var prevActivePaginationBtn = document.querySelector(".slider-nav-list li .active"),
				targetSliderIndex = +this.getAttribute("data-current-index"),
				tempDirection;

			if (prevActivePaginationBtn.classList.contains("active")) {
				prevActivePaginationBtn.classList.remove("active");
			}
			this.classList.add("active");

			userActiveControlFlag = true;
			clearTimeout(userTimoutTimer);
			clearTimeout(launchAutoSliderTimer);

			if (+this.getAttribute("data-current-index") >
				+prevActivePaginationBtn.getAttribute("data-current-index")) {
				tempDirection = "right";
			} else {
				tempDirection = "left";
			}

			launchAutoSliderTimer = setTimeout(
				function readyGo() {
					sliderRotate(tempDirection, 0.2);
					launchAutoSliderTimer = setTimeout(readyGo, 200);
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

	<!--PRELOADER !!!-->
	setTimeout(function() {
		$('#preloader').fadeOut('slow');
	}, 500);

});
