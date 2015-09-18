var myPosition = new google.maps.LatLng(43.358174, -5.854678);
var map;
function initialize(){
	var opciones = {
		center: myPosition,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("mainMap"),opciones);
}