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
		var text = $(".chat-input").val();
		var nick = Meteor.user().username || Meteor.user().profile.name;

		if(text && text.length > 0){
			Messages.insert({user:nick, text: text, sentOn: new Date()});
		}
	}
});