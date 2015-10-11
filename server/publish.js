Meteor.publish("chatMessages", function () {
	if(this.userId){

		var selfUser = Meteor.users.findOne({_id:this.userId});

		if(!selfUser.geoLocation){
			console.log("no geo at chatMessages method, userId: "+ selfUser._id);
			return [];
		}

		var userIds = [];

		var allUsers = Meteor.users.find({}).fetch();

		for (var i = 0; i < allUsers.length; i++) {
			var user = allUsers[i];

			if(user.geoLocation){
				var distance = locationUtils.getDistance(
					user.geoLocation.lat,
					user.geoLocation.lng,
					selfUser.geoLocation.lat,
					selfUser.geoLocation.lng);

				if(distance <= 5000){
					userIds.push(user._id);
				}
			}
		}

		var ins = {userId:{$in:userIds}};
		var queryParams = 
		{
			sort:{'sentOn':-1}, 
			limit:30
		};

		return Messages.find(ins, queryParams);
	}
});

Meteor.publish("markers", function(){
	if(this.userId){
		var selfUser = Meteor.users.findOne({_id:this.userId});

		if(!selfUser.geoLocation){
			console.log("no geo at markers method, userId: "+ selfUser._id);
			return [];
		}

		var allUsers = Meteor.users.find({}).fetch();

		var userIds = [];

		var allUsers = Meteor.users.find({}).fetch();

		for (var i = 0; i < allUsers.length; i++) {
			var user = allUsers[i];

			if(user.geoLocation){
				var distance = locationUtils.getDistance(
					user.geoLocation.lat,
					user.geoLocation.lng,
					selfUser.geoLocation.lat,
					selfUser.geoLocation.lng);

				if(distance <= 5000){
					userIds.push(user._id);
				}
			}
		}

		var ins = {$and:[{userId:{$in:userIds}}, {isActive:true}]};
		var queryParams = 
		{
			limit:500
		};

		return Markers.find(ins, queryParams);
	}
});

Meteor.publish("userDetails", function(){
	if(this.userId){
		return Meteor.users.find({_id:this.userId});
	}
});