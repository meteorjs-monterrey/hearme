Meteor.methods({
	updateUserGeoLocation: function(geoLocation){
		if(this.userId && geoLocation){
			Meteor.users.update({_id:this.userId}, {$set:{'geoLocation': geoLocation}});
			return true;
		}

		return false;
	},

	addMessage: function(msg){
		if(this.userId && msg.text && msg.geoLocation){

			var user = Meteor.users.findOne({_id: this.userId});

			if(msg.text.length > 0){

				if(msg.text.length > 140){
					msg.text = msg.text.substring(0,140);
				}

				Messages.insert(
					{
						user: user.name,
						userId: this.userId,
						picture: user.picture,
						text: msg.text, 
						sentOn: new Date(), 
						geoLocation: msg.geoLocation
					});

				return true;
			}
		}

		return false;
	},

	addMark: function(newMarker){
		if(this.userId && newMarker.geoLocation && newMarker.text && newMarker.text.length > 0){
			var existingMarkers = Markers.find({userId:this.userId}).fetch();

			for (var i = 0; i < existingMarkers.length; i++) {
				var existingMarker = existingMarkers[i];

				Markers.update({_id:existingMarker._id}, {$set:{'isActive': false}});

				/*
				if(existingMarker.geoLocation){
					var distance = locationUtils.getDistance(
						existingMarker.geoLocation.lat,
						existingMarker.geoLocation.lng,
						newMarker.geoLocation.lat,
						newMarker.geoLocation.lng);

					if(distance< 10){
						console.log("trying to add a marker within 10m");
						return false;
					}
				}else{
					console.log("marker without location: "+ existingMarker._id);
				}*/
			}

			var user = Meteor.users.findOne({_id:this.userId});

			Markers.insert(
				{
					userId: this.userId,
					text: newMarker.text,
					picture: user.picture,
					nick: user.name,
					geoLocation:newMarker.geoLocation,
					addedOn:new Date(),
					isActive:true
				});

		}

		return false;
	}
})