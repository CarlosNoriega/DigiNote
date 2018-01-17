function linksToWorkArea(){
	for(i = 0; i < 6; i++){
		document.getElementById("file" + i).addEventListener("click", function(){ goToWorkArea("file" + i); });
	}
}

function goToWorkArea(area){
	window.location = "workarea.html?name=area";
}

document.onload = function(){
	alert("hello");
	linksToWorkArea();
}