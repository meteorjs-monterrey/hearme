Accounts.onCreateUser(function(options, user) {
    if (typeof(user.services.facebook) != "undefined") {
        user['picture'] = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    	user['name'] = user.services.facebook.name;
    }

    return user;
});