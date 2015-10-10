Meteor.publish("chatMessages", function () {
	if(this.userId){
		return Messages.find({},{sort:{'sentOn':-1}, limit:30});
	}
});

Meteor.publish("userDetails", function(){
	if(this.userId){
		return Meteor.users.find({_id:this.userId});
	}
});