$(document).ready(function() {
    var auth = JSON.parse(sessionStorage.getItem("auth"))
    $("#welcomeMessage").text(`Welcome ${auth.name}`);
});