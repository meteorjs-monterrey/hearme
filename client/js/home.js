Template.home.onCreated(function(){

	Template.home.utils.updateUserGeoLocation();

	if(geoLocationUtils.latLng() == null){
		FlowRouter.go('/checkLocation');
	}

	Meteor.subscribe("markers");
	Meteor.subscribe("userDetails");
});

Template.home.events({
	'click a.postBtn': function(){
		Template.home.utils.showPostDialog();
	},
	'click a.chatBtn': function(){
		Template.home.utils.showChat();
	}	
});

Template.home.utils = {
	updateUserGeoLocation: function(){
		Meteor.call("updateUserGeoLocation", geoLocationUtils.latLng());

		setTimeout(Template.home.utils.updateUserGeoLocation, 60000);
	},

	showPostDialog: function() {
		$('.fixed-action-btn').hide();
		MaterializeModal.display({
			bodyTemplate: "postBody",
			footerTemplate: "postFooter",
			callback: function(error, response) {
				$('.fixed-action-btn').show();
			}
			});
	},
	showChat: function() {
		$('.fixed-action-btn').hide();
		MaterializeModal.display({
			bodyTemplate: "chat",
			footerTemplate: "chatFooter",
			bottomSheet: true,
			callback: function(error, response) {
				$('.fixed-action-btn').show();
			}
			});
	}
}