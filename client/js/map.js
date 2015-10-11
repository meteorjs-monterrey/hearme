var MAP_ZOOM = 15;
var styles = [
{
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

Meteor.startup(function() {  
    GoogleMaps.load();
});

Template.map.updateOldLocation = function(map){
    console.log("Check new location")
    if(geoLocationUtils.isOldValue){
        setTimeout(function(){
            Template.map.updateOldLocation(map);
        }, 10000);
    }
    else{
        console.log("update map location");
        var latLng = geoLocationUtils.latLng();
        map.instance.setCenter(new google.maps.LatLng(latLng.lat, latLng.lng));
    }
};

Template.map.helpers({  
    geolocationError: function() {
        var error = "Unable to get location"
        return error && error.message;
    },
    mapOptions: function() {
        var latLng = geoLocationUtils.latLng();
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM,
                styles: styles,
                streetViewControl: false,
                mapTypeControl: false,
            };
        }
    }
});

Template.map.onCreated(function() {  
    GoogleMaps.ready('map', function(map) {
        Template.map.updateOldLocation(map);
        var latLng = geoLocationUtils.latLng();
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
        });
    });
});