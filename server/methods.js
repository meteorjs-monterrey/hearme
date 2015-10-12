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

				msg.text = msg.text.replace(/</g, '');
				msg.text = msg.text.replace(/>/g, '');

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
			}

			var user = Meteor.users.findOne({_id:this.userId});

			newMarker.text = newMarker.text.replace(/</g, '');
			newMarker.text = newMarker.text.replace(/>/g, '');

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