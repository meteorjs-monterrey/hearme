Template.chatMessages.onCreated(function(){
	Meteor.subscribe("chatMessages");
});

Template.chatMessages.helpers({
	'messages': function(){
		return Messages.find({});
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
		var nick = Meteor.user().username || Meteor.user().profile.name;

		if(text && text.length > 0){
			Messages.insert({user:nick, text: text, sentOn: new Date()});
			$(".chat-input").val('');
		}
	}
};