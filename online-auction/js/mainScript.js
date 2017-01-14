'use strict';

// **** polyfills for IE

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
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
		busyFlag = false,
		JsonLotsArray,
		inputNameStatus = false,
		inputEmailStatus = false,
		inputTextStatus = false;

	var sectionHeader = document.getElementById("header"),
		sectionHome = document.getElementById("home"),
		sectionAuction = document.getElementById("auction"),
		subSectionAddNew = document.getElementById("add-new"),
		sectionContact = document.getElementById("contact"),
		sectionFooter = document.getElementById("footer");

	var logoButton = document.querySelector(".logo-link"),
		siteNavigation = document.querySelector(".site-navigation"),
		siteNavigationItems = document.querySelectorAll(".site-navigation .main-list > li > a"),
		dropdownListCont = document.querySelector(".site-navigation .main-list .dropdown-list-cont"),
		dropdownList = document.querySelector(".site-navigation .main-list > li .dropdown-list"),
		dropdownListItems = document.querySelectorAll(".site-navigation .main-list > li .dropdown-list a"),
		faBars = document.querySelector("#header .fa-bars");

	var slider = document.querySelector(".slider"),
		sliderBtnLeft = document.querySelector(".fa-angle-left"),
		sliderBtnRight = document.querySelector(".fa-angle-right"),
		sliderItems = document.querySelectorAll(".slider-item");

	var portfolioNavigationItems = document.querySelectorAll(".portfolio-navigation > li");

	var auctionMenuItems = document.querySelectorAll(".auction-nav .main-menu > li"),
		auctionWrapperContainer = document.querySelector(".auction-container"),
		auctionLotsContainer = document.querySelector(".auction-lots-container"),
		auctionItemTemplate = document.querySelector(".auction-item-cont").cloneNode(true),
		auctionSearch = document.querySelector(".auction-container .auction-search"),
		auctionPagination = document.querySelector(".auction-container .pagination"),
		paginationBtnTemplate = document.querySelector(".pagination .pagination-btn").cloneNode(true),
		auctionItemViewerCont = document.querySelector(".auction-item-viewer-cont"),
		closeAuctionViewerBtn = document.querySelector(".auction-item-viewer-cont .close-btn"),
		addNewLotBtn = document.querySelector(".add-new-lot"),
		addItemViewerContainer = document.querySelector(".add-item-viewer-cont"),
		closeAddItemViewerBtn = document.querySelector(".add-item-viewer .close-btn");

	var mapContainer = document.querySelector("#contact .map-cont"),
		inputName = document.querySelector(".inputs-container .input-name"),
		inputEmail = document.querySelector(".input-email"),
		inputText = document.querySelector(".input-text"),
		inputSubmitBtn = document.querySelector(".submit-btn"),
		inputContactContent = document.querySelector(".input-contact-content");

	var footerButton = document.querySelector(".footer-button");

	// *********************************************************************

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

	// remove template container
	document.querySelector(".auction-item-cont").remove();
	document.querySelector(".pagination .pagination-btn").remove();

    // ****************************************************************

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

	// ******************** LOAD JSON DATA WITH LOTS **********************

	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", "../online-auction/files/dataAuction.json", true);
	httpRequest.onreadystatechange = OnRequestStateChange;
	httpRequest.send(null);

	function OnRequestStateChange()
	{
		if (httpRequest.readyState != 4)
			return;
		if (httpRequest.status != 200)
			return;
		// alert(httpRequest.responseText);
		JsonLotsArray = JSON.parse(httpRequest.responseText);

		viewLots("all", 0);
	}

	function addPaginationBtn(value) {
		var tempPaginationBtn = paginationBtnTemplate.cloneNode(true);

		if (tempPaginationBtn.classList.contains("active-pagination") && value != 1) {
			tempPaginationBtn.classList.remove("active-pagination");
		}

		tempPaginationBtn.innerText = value;
		tempPaginationBtn.addEventListener('click', paginationBtnHandler);

		auctionPagination.appendChild(tempPaginationBtn);
	}
	
	function addItem(itemObj) {
		if (itemObj) {
			var tempItem = auctionItemTemplate.cloneNode(true);

			tempItem.setAttribute("data-lot-id", itemObj.id);
			tempItem.querySelector(".auction-img").src = itemObj.srcImage;
			tempItem.querySelector(".auction-title").innerText = itemObj.title;
			tempItem.querySelector(".auction-price").innerText = itemObj.price + " $";
			tempItem.addEventListener('click', auctionItemContainersHandler);

			tempItem.style.opacity = "0";
			myFadeIn(tempItem, 5);

			auctionLotsContainer.appendChild(tempItem);
		}
	}

	function fillItemViewer(itemObj) {
		// this function is used in event handler "auctionItemContainersHandler"
		auctionItemViewerCont.querySelector(".item-img").src = itemObj.srcImage;
		auctionItemViewerCont.querySelector(".item-id").innerText = "Lot # " + itemObj.id;
		auctionItemViewerCont.querySelector(".item-title").innerText = itemObj.title;
		auctionItemViewerCont.querySelector(".item-price .value").innerText = itemObj.price + " $";
		auctionItemViewerCont.querySelector(".item-date-sell .value").innerText = itemObj.timeToSell;
		auctionItemViewerCont.querySelector(".item-description").innerText = itemObj.description;
	}

	// additional fucntion: used to add several items
	function addSeveralItems(LotsArray, pageNumber, itemsPerPage) {
		if (currentCategoryGlobal != previousCategoryGlobal) {
			if ((LotsArray.length / itemsPerPage) > 1) {
				for (i = 1; i <= Math.ceil(LotsArray.length / itemsPerPage); i++) {
					addPaginationBtn(i);
				}
			}
		}

		for (i = pageNumber * itemsPerPage; i < pageNumber * itemsPerPage + itemsPerPage; i++) {
			addItem(LotsArray[i]);
		}
	}

	var previousCategoryGlobal = "";
	var currentCategoryGlobal = "all";

	function viewLots(category, pageNumber) {
		var auctionPaginationBtns = auctionPagination.querySelectorAll(".pagination-btn"),
			auctionItems = auctionLotsContainer.querySelectorAll(".auction-item-cont"),
			tempLength,
			itemsPerPage = 10,
			tempLotsArray = [],
			i;

		if (category != previousCategoryGlobal) {
			// firstly remove previous items
			tempLength = auctionPaginationBtns.length;
			if (tempLength) {
				for (i = 1; i <= tempLength; i++) {
					auctionPaginationBtns[i - 1].remove();
				}
			}
			// auctionPaginationBtns[0].classList.add("active-pagination");
		}

		tempLength = auctionItems.length;
		if (tempLength) {
			for (i = 0; i < tempLength; i++) {
				auctionItems[i].remove();
			}
		}


		switch (category) {
			case "all":
				for (i = 0; i < JsonLotsArray.length; i++) {
					tempLotsArray.push(JsonLotsArray[i]);
				}
				addSeveralItems(tempLotsArray, pageNumber, itemsPerPage);
				previousCategoryGlobal = "all";
				break;
			case "auto":
				for (i = 0; i < JsonLotsArray.length; i++) {
					if (JsonLotsArray[i].category == "auto") {
						tempLotsArray.push(JsonLotsArray[i]);
					}
				}
				addSeveralItems(tempLotsArray, pageNumber, itemsPerPage);
				previousCategoryGlobal = "auto";
				break;
			case "moto":
				for (i = 0; i < JsonLotsArray.length; i++) {
					if (JsonLotsArray[i].category == "moto") {
						tempLotsArray.push(JsonLotsArray[i]);
					}
				}
				addSeveralItems(tempLotsArray, pageNumber, itemsPerPage);
				previousCategoryGlobal = "moto";
				break;
			case "boat":
				for (i = 0; i < JsonLotsArray.length; i++) {
					if (JsonLotsArray[i].category == "boat") {
						tempLotsArray.push(JsonLotsArray[i]);
					}
				}
				addSeveralItems(tempLotsArray, pageNumber, itemsPerPage);
				previousCategoryGlobal = "boat";
				break;
			case "painting":
				for (i = 0; i < JsonLotsArray.length; i++) {
					if (JsonLotsArray[i].category == "painting") {
						tempLotsArray.push(JsonLotsArray[i]);
					}
				}
				addSeveralItems(tempLotsArray, pageNumber, itemsPerPage);
				previousCategoryGlobal = "painting";
				break;
			default:
				for (i = 0; i < JsonLotsArray.length; i++) {
					tempLotsArray.push(JsonLotsArray[i]);
				}
				addSeveralItems(tempLotsArray, pageNumber, itemsPerPage);
				previousCategoryGlobal = "all";
				break;
		}

	}

	// ****************************************************************

	// **********************  EVENT HANDLERS *************************
	function logoButtonHandler(event) {
		event.preventDefault();
		if (!busyFlag) {
			busyFlag = true;
			scrollFunc(
				pageYOffset,
				sectionHome.offsetTop,
				SCROLL_STEP
			)
		}
	}

	function footerButtonHandler(event) {
		event.preventDefault();
		if (!busyFlag) {
			busyFlag = true;
			scrollFunc(
				pageYOffset,
				sectionHome.offsetTop,
				SCROLL_STEP
			)
		}
	}

	function activeSectionHandler(event){
		event.preventDefault();
		if (!busyFlag) {

			var stopPos = sectionHome.offsetTop;
			busyFlag = true;

			// if items from main menu
			if (!this.parentNode.parentNode.classList.contains("dropdown-list")) {
				var prevActiveItem = document.querySelector(".active-section"),
					prevActiveSubItem = document.querySelector(".active-sub-menu");

				if (prevActiveSubItem) {
					prevActiveSubItem.classList.remove("active-sub-menu");
				}

				if (prevActiveItem) {
					prevActiveItem.classList.remove("active-section");
				}

				this.classList.add("active-section");
				this.style.textDecoration = "none";

				// dropdownListItems
				switch (this.getAttribute("href")) {
					case "#home":
						stopPos = sectionHome.offsetTop;
						break;
					case "#auction":
						stopPos = sectionAuction.offsetTop;
						break;
					case "#contact":
						stopPos = sectionContact.offsetTop;
						break;
					default:
						stopPos = sectionHome.offsetTop;
						break;
				}
			} else {
				// if items from sub-menu
				var prevActiveSubItem = document.querySelector(".active-sub-menu");

				if (prevActiveSubItem) {
					prevActiveSubItem.classList.remove("active-sub-menu");
				}

				this.classList.add("active-sub-menu");
				this.style.textDecoration = "none";

				switch (this.getAttribute("href")) {
					// dropdownListItems
					case "#auction":
						stopPos = sectionAuction.offsetTop;
						break;
					case "#add-new":
						stopPos = subSectionAddNew.offsetTop;
						break;
					default:
						stopPos = sectionHome.offsetTop;
						break;
				}
			}

			// The pageYOffset property is an alias for the scrollY property:
			// window.pageYOffset == window.scrollY; // always true
			// For cross-browser compatibility, use window.pageYOffset instead of window.scrollY.
			// Additionally, older versions of Internet Explorer (< 9) do not support either property
			if (stopPos == sectionHome.offsetTop) {
				scrollFunc(
					pageYOffset,
					stopPos,
					SCROLL_STEP
				);
			} else {
				scrollFunc(
					pageYOffset,
					stopPos - sectionHeader.clientHeight,
					SCROLL_STEP
				);
			}

			if (window.innerWidth < 768) {
				$(siteNavigation).slideToggle("fast");
			}
		}
	}

	function faBarsHandler() {
		$(siteNavigation).slideToggle("slow");
	}

	function dropdownListContOverHandler() {
		$(this.querySelector(".dropdown-list")).slideDown("slow");
	}

	function dropdownListContLeaveHandler() {
		$(this.querySelector(".dropdown-list")).slideUp("slow");
	}

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
		if (!event.target.classList.contains("active-portfolio-category")) {
			var prevActiveItem = document.querySelector(".active-portfolio-category"),
				portfolioGalleryImgs = document.querySelectorAll(".portfolio-gallery-item");

			prevActiveItem.classList.remove("active-portfolio-category");
			this.classList.add("active-portfolio-category");

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

	function auctionMenuHandler(event) {
		if (!event.target.classList.contains("active-auction-category")) {
			var prevActiveItem = document.querySelector(".active-auction-category");

			prevActiveItem.classList.remove("active-auction-category");
			this.classList.add("active-auction-category");

			// now determine what to turn on
			switch (this.getAttribute("data-lot-category")) {
				case "all":
					currentCategoryGlobal = "all";
					break;
				case "auto":
					currentCategoryGlobal = "auto";
					break;
				case "moto":
					currentCategoryGlobal = "moto";
					break;
				case "boat":
					currentCategoryGlobal = "boat";
					break;
				case "painting":
					currentCategoryGlobal = "painting";
					break;
				default:
					currentCategoryGlobal = "all";
					break;
			}
			viewLots(currentCategoryGlobal, 0);
		}
	}

	function paginationBtnHandler() {
		if (!this.classList.contains("active-pagination")) {
			var prevActiveItem = document.querySelector(".active-pagination");

			prevActiveItem.classList.remove("active-pagination");
			this.classList.add("active-pagination");

			viewLots(currentCategoryGlobal, +this.innerText - 1);

			if (!busyFlag) {
				busyFlag = true;

				var stopPos = sectionAuction.offsetTop;
				if (window.innerWidth < 768) {
					stopPos = auctionWrapperContainer.offsetTop - sectionHeader.clientHeight;
				}

				scrollFunc(
					pageYOffset,
					stopPos,
					SCROLL_STEP
				)
			}
		}
	}

	function auctionItemContainersHandler() {
		auctionItemViewerCont.style.display = "block";

		// JsonLotsArray[i]
		fillItemViewer(JsonLotsArray[+this.getAttribute("data-lot-id") - 1]);
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

		this.addEventListener('click', onMapClickHandler);
		this.removeEventListener('mouseleave', onMapMouseleaveHandler);
		this.querySelector('iframe').style.pointerEvents = "none";
	}

	function onMapClickHandler () {

		// Disable the click handler until the user leaves the map area
		this.removeEventListener('click', onMapClickHandler);

		// Enable scrolling zoom
		this.querySelector('iframe').style.pointerEvents = "auto";

		// Handle the mouse leave event
		this.addEventListener('mouseleave', onMapMouseleaveHandler);
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

	function scrollWindowHandler(event) {
		// alert("Scroll!!!");

		// this.style.textDecoration = "none";
		// document.documentElement.scrollTop - Mozilla works, Chrome - NO
		// document.body.scrollTop - Mozilla - NO, Chrome - Yes
		var prevActiveItem = document.querySelector(".active-section"),
			prevActiveSubItem = document.querySelector(".active-sub-menu"),
			tempOffset = 2 * sectionHeader.clientHeight,
			currentPosition = document.body.scrollTop ?
				(document.body.scrollTop + tempOffset) :
				(document.documentElement.scrollTop + tempOffset);

			if (prevActiveItem) {
				prevActiveItem.classList.remove("active-section");
			}
			if (prevActiveSubItem) {
				prevActiveSubItem.classList.remove("active-sub-menu");
			}

		if ( (currentPosition > sectionHome.offsetTop) &&
			(currentPosition < sectionHome.offsetTop + sectionHome.offsetHeight) ) {
			siteNavigationItems[0].classList.add("active-section");
		} else if ( (currentPosition > sectionAuction.offsetTop) &&
					(currentPosition < sectionAuction.offsetTop + sectionAuction.offsetHeight) ) {
			siteNavigationItems[1].classList.add("active-section");
			if (currentPosition < subSectionAddNew.offsetTop) {
				dropdownListItems[0].classList.add("active-sub-menu");
			} else {
				dropdownListItems[1].classList.add("active-sub-menu");
			}
		} else if ( (currentPosition > sectionContact.offsetTop)  ) {
			siteNavigationItems[2].classList.add("active-section");
		}

		// dropdownListItems


	}

	function resizeWindowHandler() {
		if (window.innerWidth >= 768) {
			siteNavigation.style.display = "block";
			dropdownList.style.display = "none";
			dropdownListCont.addEventListener("mouseover", dropdownListContOverHandler);
			dropdownListCont.addEventListener("mouseleave", dropdownListContLeaveHandler);
		} else {
			siteNavigation.style.display = "none";
			dropdownList.style.display = "block";
			dropdownListCont.removeEventListener("mouseover", dropdownListContOverHandler);
			dropdownListCont.removeEventListener("mouseleave", dropdownListContLeaveHandler);

		}
	}
	// ************************************************************************************

	// ***************** REGISTER EVENT HANDLERS *******************
	var i;

	logoButton.addEventListener('click', logoButtonHandler);

	for (var i = 0; i < siteNavigationItems.length; i++ ) {
		siteNavigationItems[i].addEventListener('click', activeSectionHandler);
 	}

	for (var i = 0; i < dropdownListItems.length; i++ ) {
		dropdownListItems[i].addEventListener('click', activeSectionHandler);
	}

	faBars.addEventListener('click', faBarsHandler);

	if (window.innerWidth >= 768) {
		dropdownListCont.addEventListener("mouseover", dropdownListContOverHandler);
		dropdownListCont.addEventListener("mouseleave", dropdownListContLeaveHandler);
	}

	sliderBtnLeft.addEventListener('click', sliderBtnLeftHandler);
	sliderBtnRight.addEventListener('click', sliderBtnRightHandler);

	for (i = 0; i < portfolioNavigationItems.length; i++) {
		portfolioNavigationItems[i].addEventListener('click', portfolioNavigationHandler);
	}

	// this event handlers are registered in the function above
	// for (i = 0; i < auctionItemContainers.length; i++) {
	// 	auctionItemContainers[i].addEventListener('click', auctionItemContainersHandler)
	// }

	for (i = 0; i < auctionMenuItems.length; i++) {
		auctionMenuItems[i].addEventListener('click', auctionMenuHandler);
	}

	// auctionPagination.querySelector(".pagination-btn").addEventListener('click', paginationBtnHandler);

	closeAuctionViewerBtn.addEventListener('click', closeAuctionViewerBtnHandler);
	addNewLotBtn.addEventListener('click', addNewLotBtnHandler);
	closeAddItemViewerBtn.addEventListener('click', closeAddItemViewerBtnHandler);

	// Enable map zooming with mouse scroll when the user clicks the map
	mapContainer.addEventListener('click', onMapClickHandler);

	inputName.addEventListener('keyup', inputNameHandler);
	inputEmail.addEventListener('keyup', inputEmailHandler);
	inputText.addEventListener('keyup', inputTextHandler);
	inputSubmitBtn.addEventListener('click', inputSubmitBtnHandler);

	footerButton.addEventListener('click', footerButtonHandler);

	window.addEventListener('scroll', scrollWindowHandler);
	window.addEventListener('resize', resizeWindowHandler);

	<!--PRELOADER !!!-->
	/*setTimeout(function() {
	 $('#preloader').fadeOut('slow', function() {});
	 }, 2000);*/

});

