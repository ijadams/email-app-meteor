var pageSession = new ReactiveDict();

Template.EmailsDetails.rendered = function() {
	
};

Template.EmailsDetails.events({
	
});

Template.EmailsDetails.helpers({
	
});

Template.EmailsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("emailsDetailsDetailsFormInfoMessage", "");
	pageSession.set("emailsDetailsDetailsFormErrorMessage", "");

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

Template.EmailsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("emailsDetailsDetailsFormInfoMessage", "");
		pageSession.set("emailsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var emailsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(emailsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("emailsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("emailsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("emails", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("emails", {});
	}

	
});

Template.EmailsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("emailsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("emailsDetailsDetailsFormErrorMessage");
	}
	
});
