this.Emails = new Mongo.Collection("emails");

this.Emails.userCanInsert = function(userId, doc) {
	return true;
};

this.Emails.userCanUpdate = function(userId, doc) {
	return true;
};

this.Emails.userCanRemove = function(userId, doc) {
	return true;
};
