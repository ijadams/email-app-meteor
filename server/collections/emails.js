Emails.allow({
	insert: function (userId, doc) {
		return Emails.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Emails.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Emails.userCanRemove(userId, doc);
	}
});

Emails.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Emails.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Emails.before.remove(function(userId, doc) {
	
});

Emails.after.insert(function(userId, doc) {
	
});

Emails.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Emails.after.remove(function(userId, doc) {
	
});
