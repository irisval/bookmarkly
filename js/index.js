document.addEventListener('DOMContentLoaded', function() {
	var area = document.getElementById('bookmark-list');
	chrome.storage.local.get(null, function (data) { 
		console.log(data);
		for (var b in data) {
	        var bookmark = addBookmark(data[b].title, data[b].url);
	        // console.log(bookmark);
	   		area.append(bookmark);
	    }
	});
});
document.getElementById('savepage').addEventListener('click', function(tab) {
	var title = document.getElementById('bookmark-title').value;
	var obj = {};
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {		
	   obj[title] = {
			title: title,
			url: tabs[0].url,
			added_at: Date.now()
		};
		chrome.storage.local.set(obj, function() {
			if (chrome.runtime.error)
				  console.log("Runtime error.");
			else
				console.log(obj);
		});
	});
});

function addBookmark(title, url) {
	var item = document.createElement('div');

	var title = document.createTextNode(title);

	var link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('target', '_blank');


	link.appendChild(title);
	item.appendChild(link);
	return item;
}