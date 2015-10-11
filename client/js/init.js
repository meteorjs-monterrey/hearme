 Meteor.startup(function () {
    geoLocationUtils.update();
    geoLocationUtils.setLocation(JSON.parse(Cookie.get('location')));
    GoogleMaps.load();
 });