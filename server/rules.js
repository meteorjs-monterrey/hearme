Messages.allow({
	insert: function (userId, doc) {
		if(userId){
			return true;
		}
	},
	update:function(userId, doc){
		return false;
	},
    remove: function(userId, doc) {
        return false;
    }
});