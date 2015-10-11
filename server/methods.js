Meteor.methods({
	updateUserGeoLocation: function(geoLocation){
		if(this.userId && geoLocation){
			Meteor.users.update({_id:this.userId}, {$set:{'geoLocation': geoLocation}});
			return true;
		}

		return false;
	},

	addMark: function(newMark){
		if(this.userId && newMark.geoLocation){
			var existingMarks = Marks.find({userId:this.userId}).fetch();

			for (var i = 0; i < existingMarks.length; i++) {
				var existingMark = existingMarks[i];

				if(existingMark.geoLocation){
					var distance = locationUtils.getDistance(
						existingMark.geoLocation.lat,
						existingMark.geoLocation.lng,
						newMark.geoLocation.lat,
						newMark.geoLocation.lng);

					if(distance < 10){
						return false;
					}
				}
			}

			Marks.insert(
				{
					userId: this.userId,
					geoLocation:newMark.geoLocation,
					addedOn:new Date()
				});

		}

		return false;
	}
})