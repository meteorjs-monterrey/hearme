Meteor.publish("chatMessages", function () {
	if(this.userId){
		return Messages.find({},{sort:{'sentOn':-1}, limit:30});
	}
})