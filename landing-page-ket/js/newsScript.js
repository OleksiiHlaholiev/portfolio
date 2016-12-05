/**
 * Created by Glalex on 06.12.2016.
 */

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

window.addEventListener('load', function() {
	var headerText = document.querySelector("h1"),
		newsFeed = document.querySelector(".news-feed"),
		newsTemplate = document.querySelector(".news-template");

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
	 NewsAddFromFile(indexId - 1);*/

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
		NewsAddFromFile(indexId - 1);
	}

	var indexId = window.location.search.split("id=")[1];
//            alert (indexId);

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

	function NewsAddFromFile(i) {
		var NewsArray = [],
			tempDate;

		headerText.innerText = "News #" + JsonNews[i].id;

		tempDate = new Date(JsonNews[i].date);
		NewsArray[i] = newsTemplate.cloneNode(true);
		NewsArray[i].setAttribute("data-news-index", JsonNews[i].id );
		NewsArray[i].querySelector(".news-number").innerText = tempDate.getDate();
		NewsArray[i].querySelector(".news-month").innerText = monthDecoder(tempDate.getMonth());
		NewsArray[i].querySelector(".news-text").innerText = JsonNews[i].text;
		NewsArray[i].querySelector(".read-more-btn").remove();
		newsFeed.appendChild(NewsArray[i]);

		newsTemplate.remove();
	}
})