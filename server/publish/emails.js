Meteor.publish("emails", function() {
	return Emails.find({}, {});
});

Meteor.publish("emails_empty", function() {
	return Emails.find({_id:null}, {});
});

Meteor.publish("email", function(emailId) {
	return Emails.find({_id:emailId}, {});
});

