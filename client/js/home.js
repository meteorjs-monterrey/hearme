Template.home.onCreated(function(){

	Meteor.subscribe("userDetails");
	Template.home.utils.updateUserGeoLocation();
	if(geoLocationUtils.latLng() == null){
		FlowRouter.go('/checkLocation');
	}
});

Template.home.utils = {
	updateUserGeoLocation: function(){
		Meteor.call("updateUserGeoLocation", geoLocationUtils.latLng());

		setTimeout(Template.home.utils.updateUserGeoLocation, 60000);
	},

	showPostDialog: function(){
		var postDialogData = {
			template: Template.post,
			title: "Post",
			modalDialogClass: "",
			modalBodyClass: "",
			modalFooterClass: "",
			removeOnHide: true,
			buttons:{
				"ok":{
					'class': 'btn-success',
					'label': 'Hear Me!'
				},
				"cancel":{
					'class': 'btn-danger',
					'label': 'Cancel'
	}
			}
		}

		ReactiveModal.initDialog(postDialogData).show();
	}
}