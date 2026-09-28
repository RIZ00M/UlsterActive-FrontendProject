$(document).ready(function() {
    console.log("Membership page loaded.");

    /* regex explained in report */
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $("#membership-form").on("submit", function(event) {
        /* prevent default form settings such as refreshing the page, no URL, makes things like checkboxes stay the same */
        event.preventDefault();

        var formIsValid = true; /* valid until false */
        /* variables to get */
        var name = $("#full-name").val().trim();
        var email = $("#email").val().trim();

        if (name === "") {
            /* when invalid, it adds the error CSS, same for all the others. */
            $("#error-name").addClass("show");
            $("#full-name").addClass("invalid");
            formIsValid = false;
        } else {
            $("#error-name").removeClass("show");
            $("#full-name").removeClass("invalid");
        }

        if (email === "" || !emailRegex.test(email)) {  /* if the email fails the regex test */
            $("#error-email").addClass("show");
            $("#email").addClass("invalid");
            formIsValid = false;
        } else {
            $("#error-email").removeClass("show");
            $("#email").removeClass("invalid");
        }

        /* store the amount as .length and check if there are any added */
        if ($("input[name='membership']:checked").length === 0) {
            $("#error-membership").addClass("show");
            formIsValid = false;
        } else {
            $("#error-membership").removeClass("show");
        }

        if (formIsValid) {
            $(this).find("fieldset, .form-submit").fadeOut(300, function() { /* added fading from week 9 notes */
                $("#success-msg").fadeIn(400);
            });

            /* display in console for debugging, will be removed in a real life scenario */
            console.log("------ Membership form submitted ------");
            console.log("Full name:", name);
            console.log("Email:", email);
            console.log("Membership type:", $("input[name='membership']:checked").val());

            var selectedFacilities = [];
            $("input[name='facility']:checked").each(function() {
                selectedFacilities.push($(this).val());
            });
            /* shortened this if statement, if the length is more than 0 then it will display the facilities */
            console.log("Selected facilities:", selectedFacilities.length ? selectedFacilities.join(", ") : "None preferred");
        }
    });

    /* live validation */
    $("#full-name").on("input", function() {
        if ($(this).val().trim() !== "") {
            $(this).removeClass("invalid");
            $("#error-name").removeClass("show");
        }
    });

    $("#email").on("input", function() {
        if (emailRegex.test($(this).val().trim())) {
            $(this).removeClass("invalid");
            $("#error-email").removeClass("show");
        }
    });

    /* live validation for membership, once the user changes (selects their first choice) the message disappears */
    $("input[name='membership']").on("change", function() {
        $("#error-membership").removeClass("show");
    });
});
