Template.chatMessage.helpers({
	'calculateDistance': function() {
		var latLng = geoLocationUtils.latLng();
		var msgLat = this.geoLocation.lat;
		var msgLng = this.geoLocation.lng;
		var distanceMeters = 0;
		var displayMessage = "";
		if (latLng && (msgLat && msgLng))
			distanceMeters = locationUtils.getDistance(latLng.lat, latLng.lng, msgLat, msgLng);

		if (distanceMeters < 1)
			return "";
		else if (distanceMeters < 5)
			displayMessage = "< 5m";
		else if (distanceMeters < 10)
			displayMessage = "< 10m";
		else if (distanceMeters < 100)
			displayMessage = "< 100m";
		else if (distanceMeters < 500)
			displayMessage = "< 500m";
		else if (distanceMeters < 1000)
			displayMessage = "< 1km";
		else if (distanceMeters < 5000)
			displayMessage = "< 5km";
		else
			displayMessage = "Far";
		return "( " + displayMessage + " )";
	}
});