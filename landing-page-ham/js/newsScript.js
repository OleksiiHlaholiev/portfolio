/**
 * Created by Glalex on 05.12.2016.
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
		newsContainer = document.querySelector(".news-cont"),
		newsTemplate = document.querySelector(".news-template"),
		JsonNews;

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
		NewsAddFromFile(indexId - 1);
	}

	var indexId = window.location.search.split("id=")[1];
//            alert (indexId);

	function NewsAddFromFile(i) {
		var NewsArray = [],
			tempDate;

		headerText.innerText = "Amazing post #" + JsonNews[i].id;

		tempDate = new Date(JsonNews[i].date);
		NewsArray[i] = newsTemplate.cloneNode(true);
		NewsArray[i].setAttribute("data-news-index", JsonNews[i].id );
		NewsArray[i].querySelector(".news-date").innerText =
			tempDate.getMonth() + 1 +
			"/" + tempDate.getDate() + "/" +
			tempDate.getFullYear();
		NewsArray[i].querySelector(".news-text").innerText = JsonNews[i].text;
		newsContainer.appendChild(NewsArray[i]);

		newsTemplate.remove();
	}
})