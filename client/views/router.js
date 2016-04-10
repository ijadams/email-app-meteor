Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var freeRoutes = [
	"home",
	"emails",
	"emails.insert",
	"emails.details",
	"emails.edit"
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
		this.render("loading");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("emails", {path: "/emails", controller: "EmailsController"});
	this.route("emails.insert", {path: "/emails/insert", controller: "EmailsInsertController"});
	this.route("emails.details", {path: "/emails/details/:emailId", controller: "EmailsDetailsController"});
	this.route("emails.edit", {path: "/emails/edit/:emailId", controller: "EmailsEditController"});
});
