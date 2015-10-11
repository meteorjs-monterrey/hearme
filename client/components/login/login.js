Template.login.events({
	"click .fb-login": function(event) {
		
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                alert("Facebook login error: "+ err);
            }else{
            	FlowRouter.go('/');
            }
        });
    },
});


Template.login.rendered = function(){
	if(Meteor.userId()){
		FlowRouter.go('/');
	}
}