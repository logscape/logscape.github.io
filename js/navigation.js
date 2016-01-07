$(document).ready(function(){
	function processChildren(children, navData, addToParent, currentURL, NAV) {
		var amOnThisPage = navData.url == currentURL
		var foundPageId
		var PROTO = "<li id='ID'><a href='REF'>KEY</a></li>";

			if (children != null) {

				try {
					var curNav = NAV.find("#" + navData.display.replace(/ /g,'_'))
					if (amOnThisPage) foundPageId = navData.display.replace(/ /g,'_')
					var childNav = ""
					
					for (var j = 0; j < children.length; j++) {
						var childData = children[j]
						if (addToParent) {
							childNav += PROTO.replace('ID', childData.display.replace(/ /g,'_')).replace('REF', childData.url).replace('KEY', childData.display);	
							if (currentURL == childData.url) {
								foundPageId = childData.display.replace(/ /g,'_')
								amOnThisPage = true
							}
						} else {
							// not adding hidden child so mark the parent if the current hidden page is selected
							if (currentURL == childData.url) {							
								foundPageId =  navData.display.replace(/ /g,'_')
							}
						}
						
					}


				} catch (err) {
					console.log("Nav Item ERROR:" + navData.display)
					console.log(navData.display)
					console.log(err.stack)
				}
				if (amOnThisPage){
				if(childNav != "") childNav += '<a href="sitemap.html#PROTO">More...</a>'.replace("PROTO", navData.display)
				curNav.html(curNav.html() + "<ul>" + childNav + "</ul>")
			}
			
		}
		if (foundPageId != null) {
			$("#"+ foundPageId).addClass("menuActive")
		}


	}


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


					processChildren(navData.children, navData, true, currentURL, NAV)
					processChildren(navData.hiddenchildren, navData, false, currentURL, NAV)

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