Template.home.onCreated(function(){

	Template.home.utils.updateUserGeoLocation();

	if(geoLocationUtils.latLng() == null){
		FlowRouter.go('/checkLocation');
	}

	Meteor.subscribe("markers");
	Meteor.subscribe("userDetails");
});

Template.home.events({
	'click .post': function(){
		Template.home.utils.showPostDialog();
	}
});

Template.home.utils = {
	updateUserGeoLocation: function(){
		Meteor.call("updateUserGeoLocation", geoLocationUtils.latLng());

		setTimeout(Template.home.utils.updateUserGeoLocation, 60000);
	},

	showPostDialog: function() {
		MaterializeModal.display({
			bodyTemplate: "postBody",
			footerTemplate: "postFooter"
		});
	}
}