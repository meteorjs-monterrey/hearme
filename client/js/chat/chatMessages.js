Template.chatMessages.onCreated(function(){
	Meteor.subscribe("chatMessages");
});

Template.chatMessages.helpers({
	'messages': function(){
		return Messages.find({});
	},

	'userGeoLocation': function(){
		return Geolocation.latLng();
	}
});

Template.chatMessages.events({
	'click .send-message': function(){
		Template.chatMessages.utils.sendMessage();
	},

	'keypress #chatInput': function(event){
		if (event.which === 13) {
			Template.chatMessages.utils.sendMessage();
	    }
	}
});

Template.chatMessages.utils = {
	sendMessage: function(){
		var text = $(".chat-input").val();
		var nick = "";

		if(text && text.length > 0){
			Messages.insert(
				{
					user:Meteor.user().name,
					userId: Meteor.userId(),
					picture: Meteor.user().picture,
					text: text, 
					sentOn: new Date(), 
					geoLocation:geoLocationUtils.latLng()
				});
			
			$(".chat-input").val('');
		}
	}
};