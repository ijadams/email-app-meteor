var pageSession = new ReactiveDict();

Template.EmailsEdit.rendered = function() {
	
};

Template.EmailsEdit.events({
	
});

Template.EmailsEdit.helpers({
	
});

Template.EmailsEditEditForm.rendered = function() {
	

	pageSession.set("emailsEditEditFormInfoMessage", "");
	pageSession.set("emailsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.EmailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailsEditEditFormInfoMessage", "");
		pageSession.set("emailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(emailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("emails", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Emails.update({ _id: t.data.email._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("emails", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EmailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailsEditEditFormErrorMessage");
	}
	
});
