var MAP_ZOOM = 15;
var currentMarkers = [];

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
    Meteor.subscribe("markers");

    GoogleMaps.ready('map', function(map) {

        var markers = Markers.find({}).observe({
            added: function(doc){
                var markerAdded = false;
                for (var i = 0; i < currentMarkers.length; i++) {
                    if(currentMarkers[i].doc._id == doc._id){
                        markerAdded = true;
                    }
                };

                if(!markerAdded){

                    var latLng = geoLocationUtils.latLng();
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(doc.geoLocation.lat, doc.geoLocation.lng),
                        map: map.instance,
                        data: doc,
                        //icon: "/images/logo.png",
                        animation: google.maps.Animation.DROP
                    });
                    var contentString = '<div class="chip"><img src="' + doc.picture + '"/>' + doc.nick + '</div>' + '<p>' + doc.text + '</p>';
                    
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    
                    marker.addListener('click',function(){
                        console.log(this.data);
                        if (infowindow) {
                            infowindow.close();
                        }
                        infowindow.open(map.instance, marker);
                    });
                    currentMarkers.push({doc:doc, marker: marker});
                }
            },
            removed: function(doc){

                for (var i = 0; i < currentMarkers.length; i++) {
                    if(currentMarkers[i].doc._id == doc._id){
                        currentMarkers[i].marker.setMap(null);
                        currentMarkers.splice(i, 0);
                    }
                };
            }
        });
    });
});