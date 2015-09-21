var myPosition = new google.maps.LatLng(43.358174, -5.854678);
var map;
function initialize(){
	var opciones = {
		center: myPosition,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("mainMap"),opciones);

	var infoWindow = new google.maps.InfoWindow({map: map});

	//Geolocalizacion con HTML5
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			infoWindow.setPosition(pos);
			infoWindow.setContent('Tu ubicacion.');
			map.setCenter(pos);
		}, function(){
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		//Tu navegador no soporta geolocalizacion
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: El servicio de geolocalizacion ha fallado.' :
		'Error: Tu Navegador no soporta geolocalizacion');
}