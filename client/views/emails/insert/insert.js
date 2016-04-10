var pageSession = new ReactiveDict();

Template.EmailsInsert.rendered = function() {
	
};

Template.EmailsInsert.events({
	
});

Template.EmailsInsert.helpers({
	
});

Template.EmailsInsertInsertForm.rendered = function() {
	

	pageSession.set("emailsInsertInsertFormInfoMessage", "");
	pageSession.set("emailsInsertInsertFormErrorMessage", "");

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

Template.EmailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailsInsertInsertFormInfoMessage", "");
		pageSession.set("emailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(emailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("emails", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Emails.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.EmailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailsInsertInsertFormErrorMessage");
	}
	
});
