$(document).ready(function(){

	function doNav(data) {
			
			var json = JSON.parse(data)
			MYNAV = json
			var NAV = $(".nav");
			NAV.html('');

			if (json == null) return

			var currentURL = window.location.pathname.substring(1)
			
			var PROTO = "<li id='ID'><a href='REF'>KEY</a></li>";

			for (var i = 0; i < json.index.length; i++) {
				var navData = json.index[i]
				NAV.html(NAV.html() + PROTO.replace('ID', navData.display.replace(/ /g,'_')).replace('REF', navData.url).replace('KEY', "&#9654; "  + navData.display));
				var children = navData.children;
				var amOnThisPage = navData.url == currentURL
				var foundPageId

				if (children != null) {
					var curNav = NAV.find("#" + navData.display.replace(/ /g,'_'))
					if (amOnThisPage) foundPageId = navData.display.replace(/ /g,'_')
					var childNav = ""
					
					for (var j = 0; j < children.length; j++) {
						var childData = children[j]
						childNav += PROTO.replace('ID', childData.display.replace(/ /g,'_')).replace('REF', childData.url).replace('KEY', childData.display);
						if (currentURL == childData.url) {
							foundPageId = childData.display.replace(/ /g,'_')
							amOnThisPage = true
						}
					}
					if (amOnThisPage) curNav.html(curNav.html() + "<ul>" + childNav + "</ul>")
				}
			}
			if (foundPageId != null) {
				$("#"+ foundPageId).addClass("menuActive")
			}

	}
	// var importedJsonObject = $.getJSON("/sitemap/nav.json",function(data){})
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		//console.log("calling 1")
	    if (xhr.readyState == 4) {
	    	try {
	    		doNav(xhr.responseText);
	    	} catch (err) {
	    		console.log(err.stack)
	    	}

	        
	    }
	}
	xhr.open('GET', '/sitemap/nav.json', true);
	xhr.send(null);



});