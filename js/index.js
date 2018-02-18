document.addEventListener('DOMContentLoaded', function() {
	var area = document.getElementById('bookmark-list');
	chrome.storage.local.get(null, function (data) { 
		console.log(data)
		for (var b in data) {
	        var bookmark = addBookmark(data[b].id, data[b].title, data[b].url);
	   		area.append(bookmark);
	   		var x = document.querySelectorAll('.rmv');
	   		for (var i = 0; i < x.length; i++) {
	   			x[i].addEventListener('click', function(el) {
	   				idRmv = el.target.closest("div").id;
	   				chrome.storage.local.remove(idRmv, function(data) {
	   					data.idRmv.pop();
	   				});
	   			});
	   		}
	    }
	});
});

document.getElementById('savepage').addEventListener('click', function(tab) {
	var title = document.getElementById('bookmark-title').value;
	var obj = {};
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {		
	   obj[Date.now()] = {
	   		id: Date.now(),
			title: title,
			url: tabs[0].url
		};
		chrome.storage.local.set(obj, function() {
			if (chrome.runtime.error)
				  console.log("Runtime error.");
			else
				console.log(obj);
		});
	});
});


function addBookmark(id, title, url) {
	var item = document.createElement('div');
	item.setAttribute('id', id)

	var title = document.createTextNode(title);

	var link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('target', '_blank');
	link.appendChild(title);
	item.appendChild(link);

	var rmv = document.createElement('a');
	rmv.setAttribute('class', 'rmv');
	rmv.insertAdjacentHTML('afterbegin','<i class="far fa-trash-alt"></i>');
	
	item.appendChild(rmv);
	return item;
}

function removeBookmark(el) {
	console.log(el);
}







