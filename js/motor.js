var myPosition = new google.maps.LatLng(43.358174, -5.854678);
var map;
/*
var shops = [["<h1>Caja Rural</h1><img src='http://2.bp.blogspot.com/-VgGuN277mxs/VfcBJCfo-SI/AAAAAAAAMgE/ltnLgQyYXnw/s1600/20150914095933%2B%25281%2529.jpg' height='102px' />", 43.35589, -5.85099, 1],
		["<h1>Banco Sabadell</h1><img src='http://4.bp.blogspot.com/-7LI6iaOtJiA/VfcBJOceudI/AAAAAAAAMf4/WGShFM4J1fQ/s1600/20150914095933%2B%25282%2529.jpg' height='102px' />", 43.35575, -5.85053, 2 ],
		["<h1>La Caixa</h1><img src='http://2.bp.blogspot.com/-y2sOJvmLcA0/VfcBJszCeHI/AAAAAAAAMgY/CNZM7HPUrLM/s1600/20150914095933%2B%25283%2529.jpg' height='102px' />", 43.35752, -5.84848, 3]
	];*/
var shops = [
	["(43.35589, -5.85099)","Mis Sidras", "Oferta de sidras a partir de 1"],
	["(43.35575, -5.85053)","Almacen", "Oferta de ropa 3x1"]
	];
var markers = [];
var shopPosition;
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

	google.maps.event.addListener(map, 'dblclick', function(event){
		shopPosition = actual(event.latLng);
		addMarker(event.latLng);
	});

	var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch({
	    location: myPosition,
	    radius: 500,
	    types: ['store']
	  }, callback);

}

function actual(location){
		return location;
	}
function addMarker(location){
	marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markers.push(marker);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: El servicio de geolocalizacion ha fallado.' :
		'Error: Tu Navegador no soporta geolocalizacion');
}
function addShop(){
	var name = document.getElementById('name').value;
	var description = document.getElementById('description').value;
	shop = [shopPosition,name, description];	
	shops.push(shop);
	addInfo(shopPosition, name, description);
	//window.alert(shops);	
}
function addInfo(p, n, d){
	var contenido = "<h1>"+n+"</h1><p>"+d+"</p>";
	var info = new google.maps.InfoWindow({
		content: contenido
	});
	marker.addListener('mouseover', function(){
		info.open(map,marker);
	});
}
function addBanks(){
	var service = new google.maps.InfoWindow
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

/*
function showShops(){
	var localization;
	for (var i = 0; i < shops.length; i++) 
	{
		shop = shops[i];
		localizacion = shop[0];
		tienda = new google.maps.Marker({
			position: {lat: localization[0], lng:localization[1]},
			map: map
		});
		window.alert(localization[0]);
		tienda.setMap(shop[0]);
	};
}*/