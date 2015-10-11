Template.checkLocation.isLocationSet = function(){
	console.log("Checking Location.");
	geoLocationUtils.update();
	if(geoLocationUtils.latLng() == null){
		console.log("Check again.");
		setTimeout(function(){
			Template.checkLocation.isLocationSet();
		}, 5000);
	}
	else{
		console.log("Go HOME");
		FlowRouter.go('/');
	}
}

Template.checkLocation.onCreated(function() {
	Template.checkLocation.isLocationSet();
});