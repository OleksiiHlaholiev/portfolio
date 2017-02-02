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

	var slider = document.querySelector(".slider"),
		sliderBtnLeft = document.querySelector(".fa-angle-left"),
		sliderBtnRight = document.querySelector(".fa-angle-right"),
		sliderItems = document.querySelectorAll(".slider-item");

	// --------------------------- MAIN CODE --------------------------------------


	// initial call
	var launchAutoSliderTimer = setTimeout(
		function readyGo() {
			sliderRotate("right");
			launchAutoSliderTimer = setTimeout(readyGo, SLIDER_AUTO_DELAY);
		},
		SLIDER_AUTO_DELAY
	);

	// ************************* FUNCTIONS ***************************

	function sliderRotate(direction) {
		if (!sliderBusyFlag) {
			sliderBusyFlag = true;
			var deltaX,
				sliderWidth = slider.clientWidth,
				temp,
				localSliderProtectTimer,
				sliderBorderLeft = -25,
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
				sliderItems[i].style.transition = "left 1s";
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

				temp += "%";
				sliderItems[i].style.left = temp;
			}

			// try to fix slider bug !!!
			if (sliderItems[0].style.left == sliderItems[1].style.left ||
				sliderItems[0].style.left == sliderItems[2].style.left ||
				sliderItems[1].style.left == sliderItems[2].style.left) {
				// set initial positions
				// alert("This is slider bug!!!");
				sliderItems[0].style.left = "-20%";
				sliderItems[1].style.left = "0%";
				sliderItems[2].style.left = "20%";
				sliderItems[3].style.left = "40%";
				sliderItems[4].style.left = "60%";
			}

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

	function sliderBtnHandler(event) {
		userActiveControlFlag = true;
		clearTimeout(userTimoutTimer);
		clearInterval(launchAutoSliderTimer);

		if (event.target.classList.contains("fa-angle-left")) {
			sliderRotate("left");
		} else {
			sliderRotate("right");
		}

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

	// ************************************************************************************

	// ***************** REGISTER EVENT HANDLERS *******************

	sliderBtnLeft.addEventListener('click', sliderBtnHandler);
	sliderBtnRight.addEventListener('click', sliderBtnHandler);


});
