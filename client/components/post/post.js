Template.postBody.events({
  "click button[data-custom-action], submit form": function(e, tmpl) {
    //  (1) Grab the user's input
    var result = tmpl.find("input#postText").value;
    //  (2) Do some custom logic!
    if (result.length < 100) {
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