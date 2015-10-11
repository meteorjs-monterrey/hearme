Template.checkLocation.redirectWhenLocationSet = function(){
	if(geoLocationUtils.latLng() == 'undefined' || geoLocationUtils.latLng() == null){
		setTimeout(function(){
			Template.checkLocation.redirectWhenLocationSet();
		}, 5000);
	}
	else{
		FlowRouter.go('/');
	}
}

Template.checkLocation.onCreated(function() {
	Template.checkLocation.redirectWhenLocationSet();
});