Meteor.methods({
	updateUserGeoLocation: function(geoLocation){
		if(this.userId && geoLocation){
			Meteor.users.update({_id:this.userId}, {$set:{'geoLocation': geoLocation}});
			return true;
		}

		return false;
	}
})