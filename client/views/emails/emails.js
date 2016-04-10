var pageSession = new ReactiveDict();

Template.Emails.rendered = function() {
	
};

Template.Emails.events({
	
});

Template.Emails.helpers({
	
});

var EmailsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EmailsViewSearchString");
	var sortBy = pageSession.get("EmailsViewSortBy");
	var sortAscending = pageSession.get("EmailsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "dueDate", "sendDate", "jobNumber", "projectManager", "subjectLine", "senderName", "senderEmail", "lists", "emailServiceBool", "imfooterBool", "textOnlyBool", "clientAddressBool", "phoneLinkedBool", "absolutePathsBool", "clientInfoBool", "viewInBrowserBool", "imagesDisplayBlockAltTagsBool", "spacerGifsBool", "rowsToTablesBool", "permissionReminderBool", "testsSentBool", "dfFooterBool", "ccTrackingBool", "testEmailApprovedBool", "emailInWOBool", "fridayBool", "sendNextDayBool", "testURL"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var EmailsViewExport = function(cursor, fileType) {
	var data = EmailsViewItems(cursor);
	var exportFields = ["name", "dueDate", "sendDate", "jobNumber", "projectManager", "subjectLine", "senderName", "senderEmail", "lists", "emailServiceBool", "imfooterBool", "textOnlyBool", "clientAddressBool", "phoneLinkedBool", "absolutePathsBool", "clientInfoBool", "viewInBrowserBool", "imagesDisplayBlockAltTagsBool", "spacerGifsBool", "rowsToTablesBool", "permissionReminderBool", "testsSentBool", "dfFooterBool", "ccTrackingBool", "testEmailApprovedBool", "emailInWOBool", "fridayBool", "sendNextDayBool", "testURL"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.EmailsView.rendered = function() {
	pageSession.set("EmailsViewStyle", "table");
	
};

Template.EmailsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("EmailsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("EmailsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("EmailsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("emails.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EmailsViewExport(this.emails, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EmailsViewExport(this.emails, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EmailsViewExport(this.emails, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EmailsViewExport(this.emails, "json");
	}

	
});

Template.EmailsView.helpers({

	

	"isEmpty": function() {
		return !this.emails || this.emails.count() == 0;
	},
	"isNotEmpty": function() {
		return this.emails && this.emails.count() > 0;
	},
	"isNotFound": function() {
		return this.emails && pageSession.get("EmailsViewSearchString") && EmailsViewItems(this.emails).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EmailsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EmailsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("EmailsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EmailsViewStyle") == "gallery";
	}

	
});


Template.EmailsViewTable.rendered = function() {
	
};

Template.EmailsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EmailsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EmailsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EmailsViewSortAscending") || false;
			pageSession.set("EmailsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EmailsViewSortAscending", true);
		}
	}
});

Template.EmailsViewTable.helpers({
	"tableItems": function() {
		return EmailsViewItems(this.emails);
	}
});


Template.EmailsViewTableItems.rendered = function() {
	
};

Template.EmailsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("emails.details", {emailId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Emails.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Emails.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("emails.edit", {emailId: this._id});
		return false;
	}
});

Template.EmailsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
