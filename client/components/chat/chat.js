Template.chat.onCreated(function(){
	Meteor.subscribe("chatMessages");
});

Template.chat.rendered = function(){
	
  Messages.find().observeChanges({
	    added: function(id, doc) {
	        if(!Template.chat.utils.scrolling){
	        	Template.chat.utils.scrollTop();
	   		}
	  }
	});
};

Template.chat.helpers({
	'messages': function(){
		return Messages.find({});
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
		console.log(text);
		if (Meteor.user()) {
			currentUser.userName = Meteor.user().name;
			currentUser.userId = Meteor.userId();
			currentUser.picture = Meteor.user().picture;
		}

		if(text && text.length > 0){

			Meteor.call("addMessage", {text: text, geoLocation:geoLocationUtils.latLng()});
			
			$(".chat-input").val('');
			$(".chat-input").focus();
		}
	},
	scrolling: true,
	scrollTop: function(){
		var height = 0;
    	$('.chat-messages li').each(function(i, value){
    	    height += parseInt($(this).height());
    	});
		height += $(".chat-input").height();
		console.log(height);
    	$('.chat-messages').scrollTop(height);
	}
};