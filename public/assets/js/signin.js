$(document).ready(function () {

    ///////////  SIGN UP FORM SUBMISSION  /////////////////
    $("#signupForm").submit(function (event) {
        event.preventDefault();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        var passwordConfirm = $("#passwordConfirm").val().trim();
        var name = $("#name").val().trim();

        var validation = validateForm(email, password, passwordConfirm, name);
        // console.log(validation);
        if (!validation.isValid) {
            setSignupMessage(validation.message);
            return;
        }
    var passwordEncrypted = btoa(password).toString().replace(["/","?","+"], "SA");       
     $.post(`/user/add/${email}/${passwordEncrypted}/${name}`, function (data) {
            //console.log(data.body);
            if (data.success) {
                sessionStorage.setItem("auth", JSON.stringify({
                    userId: data.body.id,
                    email: data.body.email,
                    name: data.body.name
                }));
                window.location.href = "/";
            } else {
                setSignupMessage(data.body);
            }
        }).fail(function (err) {
            console.log("add user post failed: ", err);
           setSignupMessage("Error: " + err.message);
        });
    });
});


//////////////// SIGN IN FORM SUBMISSION  ///////////////////
$("#signinForm").submit(function (event) {
    event.preventDefault();
    var email = $("#emailIn").val();
    var password = $("#passwordIn").val();
    var passwordEncrypted = btoa(password).toString().replace(["/","?","+"], "SA");
    $.get(`/auth/${email}/${passwordEncrypted}`, function (data) {
        if (data.success) {
            window.sessionStorage.setItem("auth", JSON.stringify({
                userId: data.body.id,
                email: data.body.email,
                name: data.body.name
            }));
            window.location.href = "/";
        } else {
            setSigninMessage(data.body);
        }
    }).fail(function (err) {
        setSigninMessage(err.message);
    });
});

function setSignupMessage(message) {
    $("#signupMessage").text(message);
}

function setSigninMessage(message) {
    $("#signinMessage").text(message);
}

function validateForm(email, password, passwordConfirm, name) {
    if (email.length > 255) return {
        isValid: false,
        message: "The email is too long (255 max)"
    }
    if (passwordConfirm !== password) return {
        isValid: false,
        message: "Password and confirmation did not match"
    };
    if (password.length < 4) return {
        isValid: false,
        message: "The password is too short"
    }
    if (password.length > 255) return {
        isValid: false,
        message: "The password is too long (255 max)"
    };
    if (name.length > 255) return {
        isValid: false,
        message: "The name is too long (255 max)"
    };
    return {
        isValid: true,
        message: ""
    };
}

function robotCheckChanged(sender) {
    if(sender.checked) {
        $("#signupSubmitButton").removeAttr("disabled");    
    } else {        
        $("#signupSubmitButton").attr("disabled", "disabled");
    }
}