var map;
var service;
var infoWindow;
var myLocation;
var lat;
var lng;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function initMap(location) {
  //console.log(location.coords.latitude, location.coords.longitude);
  lat = location.coords.latitude;
  lng = location.coords.longitude;
  myLocation = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(document.getElementById("map"), {
    center: myLocation,
    zoom: 11
  });

  var request = {
    location: myLocation,
    radius: "20000",
    query: "grocery store"
  };

  var meMarker = new google.maps.Marker({
    map: map,
    title: "Me",
    place: {
      placeId: "me",
      location: myLocation
    },
    icon: {
      url: "/assets/img/me-map.png",
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(30, 30)
    },
    clickable: false
  });

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    //console.log(results);
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  //console.log(place);
  var marker = new google.maps.Marker({
    map: map,
    title: place.name,
    place: {
      placeId: place.place_id,
      location: place.geometry.location
    },
    icon: {
      url: "/assets/img/grocery-store.png",
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(26, 25)
    },
    clickable: true
  });

  marker.addListener("click", function(event) {
    // console.log(place);
    var urlEncodedAddress = place.formatted_address
      .toString()
      .replace(" ", "+");
    var urlEncodedName = place.name.toString().replace(" ", "+");

   
    // Take the user to goole maps to get directions, etc..
    window.location.href = `https://www.google.com/maps/search/${urlEncodedName}+${urlEncodedAddress}//@${
      place.geometry.location.lat
    },${place.geometry.location.lng},15z`;
  });
}
