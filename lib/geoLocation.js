geoLocationUtils = new function() {
	this.geoLocation = null;
	this.latLng = function(){
		return this.geoLocation;
	};
	this.update = function(){
		this.geoLocation = Geolocation.latLng();
		console.log("update call");
		setTimeout(function(){
			geoLocationUtils.update();
		}, 30000);
	};
}