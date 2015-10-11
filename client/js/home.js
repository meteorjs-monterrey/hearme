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

		var dialog = ReactiveModal.initDialog(postDialogData);

		dialog.buttons.ok.on('click', function(){
			var text = $("#postText").val();

			Meteor.call("addMark", {geoLocation: geoLocationUtils.latLng(), text:text});
		});

		dialog.show();

	}
}