 Meteor.startup(function () {
    geoLocationUtils.update();
    console.log("cookie: " + Cookie.get('location'));
    var cookie = Cookie.get('location')
    if(cookie != undefined){
    	geoLocationUtils.setLocation(JSON.parse(cookie));
	}
    GoogleMaps.load();
 });