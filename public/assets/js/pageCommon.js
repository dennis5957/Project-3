$(document).ready(function () {


});

var sessionAuth = sessionStorage.getItem("auth");
var title = $(document).find("title").text();
//console.log(window);
if (sessionAuth === null && title !== "Sign-In") {
    window.location.href = "/signin";
}