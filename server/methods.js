Meteor.methods({
	updateUserGeoLocation: function(geoLocation){
		if(this.userId && geoLocation){
			Meteor.users.update({_id:this.userId}, {$set:{'geoLocation': geoLocation}});
			return true;
		}

		return false;
	},

	addMark: function(newMarker){
		if(this.userId && newMarker.geoLocation && newMarker.text && newMarker.text.length > 0){
			var existingMarkers = Markers.find({userId:this.userId}).fetch();

			for (var i = 0; i < existingMarkers.length; i++) {
				var existingMarker = existingMarkers[i];

				if(existingMarker.geoLocation){
					var distance = locationUtils.getDistance(
						existingMarker.geoLocation.lat,
						existingMarker.geoLocation.lng,
						newMarker.geoLocation.lat,
						newMarker.geoLocation.lng);

					if(distance< 10){
						return false;
					}
				}else{
					console.log("marker without location: "+ existingMarker._id);
				}
			}

			var user = Meteor.users.findOne({_id:this.userId});

			Markers.insert(
				{
					userId: this.userId,
					text: newMarker.text,
					picture: user.picture,
					nick: user.name,
					geoLocation:newMarker.geoLocation,
					addedOn:new Date()
				});

		}

		return false;
	}
})