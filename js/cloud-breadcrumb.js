$( document ).ready(function() {
    console.log( "ready!" );
    console.log("Running breadcrumb.js");
    updateBreadcrumb()
});

function updateBreadcrumb(){
	url = window.location.pathname;
	page = getPage(url);
	breadcrumb = breadcrumbs(page)

	x = document.getElementById("breadcrumb")
	x.innerHTML = breadcrumb
}

function crumb(page, name){
     link=$("<a></a>")
     console.log(link)
     link.attr("href",page+".html");
     link.text(name.replace(/_/g, ' '));
     return link[0].outerHTML;
}

function breadcrumbs(page){    
    
    var links = [];
    var tokens=[];
    page.split("-").forEach(
        function(el){
            tokens.push(el)
            links.push(crumb(tokens.join("-"), el))             
        }
    );
    
    console.log(links)
    return links.join(">>");
}

function getPage(url){
    url = url.substring(0, url.lastIndexOf('.'));
    return url.substring(url.lastIndexOf('/')+1);
}