$(document).ready(function() {
    console.log("Contact page loaded.");

    /* regex explained in report */
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $("#contact-form").on("submit", function(event) {
        event.preventDefault();  /* prevent default form settings such as refreshing the page, no URL, makes things like checkboxes stay the same */

        var formIsValid = true; /* form is valid until made invalid */
        /* get inputs */
        var name = $("#full-name").val().trim();
        var email = $("#email").val().trim();
        var phone = $("#phone").val().trim();
        var message = $("#message").val().trim();

        if (name === "") { 
            /* when invalid, it adds the error CSS, same for all the others. */
            $("#error-name").addClass("show");
            $("#full-name").addClass("invalid");
            formIsValid = false;
        } else {
            $("#error-name").removeClass("show");
            $("#full-name").removeClass("invalid");
        }

        if (email === "" || !emailRegex.test(email)) { /* if the email fails the regex test */
            $("#error-email").addClass("show");
            $("#email").addClass("invalid");
            formIsValid = false;
        } else {
            $("#error-email").removeClass("show");
            $("#email").removeClass("invalid");
        }

        if (formIsValid) { /* if the formIsValid variable remains true */
            $(this).find("fieldset, .form-submit").fadeOut(300, function() { /* added fading from week 9 notes */
                $("#success-msg").fadeIn(400);
            });

            /* display in console for debugging, will be removed in a real life scenario */
            console.log("------ Contact form submitted ------"); 
            console.log("Full name:", name);
            console.log("Email:", email);
            console.log("Phone:", phone || "Not provided");
            console.log("Message:", message || "No message provided");

            /* display the facilities from an array */
            var selectedIssues = [];
            $("input[name='facility']:checked").each(function() {
                selectedIssues.push($(this).val()); /* add to array */
            });
            /* shortened this if statement, if the length is more than 0 then it will display the issues */
            console.log("Selected issue(s):", selectedIssues.length ? selectedIssues.join(", ") : "None selected");
        }
    });

    /* added live validation, will run when the user inputs anything into the textbox */
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
});
