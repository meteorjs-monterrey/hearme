FlowRouter.route('/',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'home'})
		}
	});

FlowRouter.route('/login',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'login'})
		}
	});


FlowRouter.triggers.enter([redirectIfNoUser]);

function redirectIfNoUser(context, redirect){
	if (context.path != '/login' && !Meteor.userId()) {
		redirect('/login');
	}
}