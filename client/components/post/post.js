Template.postBody.events({
  "click button[data-custom-action], submit form": function(e, tmpl) {
    
    var result = tmpl.find("input#postText").value;

    if (result.length < 100) {
      console.log(result);
      Template.postBody.utils.postMarker();
      MaterializeModal.close();
    } else {
      Materialize.toast("Sorry, the message was too long", 1000, "red");
    }
    return false;
  }
});
Template.postBody.utils = {
	postMarker: function(){
		var text = $("#postText").val();
		Meteor.call("addMark", {geoLocation: geoLocationUtils.latLng(), text:text});
	}
};