geoLocationUtils = new function() {
	this.geoLocation = null;
	this.isOldValue = true;
	this.setLocation = function(gLocation){
		this.geoLocation = gLocation;
	};
	this.latLng = function(){
		return this.geoLocation;
	};
	this.update = function(){
		var gLocation = Geolocation.latLng();
		var interval = 30000;
		if(gLocation === 'undefined' || gLocation == null){
			interval = 5000;
		}
		else{
			this.geoLocation = gLocation;
			Cookie.set('location', JSON.stringify(this.geoLocation), { expires: 1 });
			this.isOldValue = false;
		}
		setTimeout(function(){
			geoLocationUtils.update();
		}, interval);
	};
}