UI.registerHelper("calculateDistance", function(lat1, lng1, lat2, lng2){
	return locationUtils.getDistance(lat1, lng1, lat2, lng2);
});