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

	var auctionItemContainers = document.querySelectorAll(".auction-item-cont"),
		auctionItemViewerCont = document.querySelector(".auction-item-viewer-cont"),
		closeAuctionViewerBtn = document.querySelector(".auction-item-viewer-cont .close-btn");

    /*var overlayDiv = document.getElementsByClassName("overlay");

    function overlayDivHandler() {
		//onClick="style.pointerEvents='none'">
		this.style.pointerEvents='none';
	}


	overlayDiv[0].addEventListener("click", overlayDivHandler);*/

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

	function closeAuctionViewerBtnHandler () {
		auctionItemViewerCont.style.display = "none";
	}


	// ***************** REGISTER EVENT HANDLERS *******************
	var i;

	for (i = 0; i < auctionItemContainers.length; i++) {
		auctionItemContainers[i].addEventListener('click', auctionItemContainersHandler)
	}

	closeAuctionViewerBtn.addEventListener('click', closeAuctionViewerBtnHandler);


	// Enable map zooming with mouse scroll when the user clicks the map
	$('.map-cont')[0].addEventListener('click', onMapClickHandler);

	<!--PRELOADER !!!-->
	/*setTimeout(function() {
	 $('#preloader').fadeOut('slow', function() {});
	 }, 2000);*/

});

