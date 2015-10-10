Template.home.onCreated(function(){
	Meteor.subscribe("userDetails");
	Template.home.utils.updateUserGeoLocation()

});

Template.home.utils = {
	updateUserGeoLocation: function(){
		Meteor.call("updateUserGeoLocation", Geolocation.latLng());

		setTimeout(Template.home.utils.updateUserGeoLocation, 5000);
	}
}