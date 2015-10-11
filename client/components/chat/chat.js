Template.chat.onCreated(function(){
	Meteor.subscribe("chatMessages");
});

Template.chat.helpers({
	'messages': function(){
		return Messages.find({});
	},

	'userGeoLocation': function(){
		return Geolocation.latLng();
	}
});

Template.chat.events({
	'click .send-message': function(){
		Template.chat.utils.sendMessage();
	},

	'keypress #chatInput': function(event){
		if (event.which === 13) {
			Template.chat.utils.sendMessage();
	    }
	}
});

Template.chat.utils = {
	sendMessage: function(){
		var text = $(".chat-input").val();
		var nick = "";
		var currentUser = {
			userName: "Anonymous",
			userId: "-1",
			picture: ""
		};
		if (Meteor.user()) {
			currentUser.userName = Meteor.user().name;
			currentUser.userId = Meteor.userId();
			currentUser.picture = Meteor.user().picture;
		}

		if(text && text.length > 0){

			Meteor.call("addMessage", {text: text, geoLocation:geoLocationUtils.latLng()});
			
			$(".chat-input").val('');
		}
	}
};