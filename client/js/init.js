 Meteor.startup(function () {
    geoLocationUtils.update();
    var cookie = Cookie.get('location')
    if(cookie != undefined){
    	geoLocationUtils.setLocation(JSON.parse(cookie));
	}
    GoogleMaps.load();
 });