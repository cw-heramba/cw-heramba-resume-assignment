let validity_obj = {
    username_valid: false,
    email_valid: false,
    password_valid: false,
    confirm_password_valid: false,
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.classList.toggle("bi-eye");
});

const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
const confirmPassword = document.querySelector("#confirm_password");

toggleConfirmPassword.addEventListener("click", function () {
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);

    this.classList.toggle("bi-eye");
});

var form = document.getElementsByClassName('signup-form')[0];


form.addEventListener("input", function (event) {
    console.log(event.target.id);
    message = document.getElementById("message-" + event.target.id);
    switch (event.target.id) {
        case "username":
            validateUsername(event.target, message);
            break;
        case "email":
            validateEmail(event.target, message);
            break;
        case "password":
            validatePassword(event.target, message);
            break;
        case "confirm_password":
            validateConfirmPassword(event.target, message);
            break;
    }
    allValid();
});

function updateState(target, r_border, a_border) {
    target.classList.remove(r_border);
    target.classList.add(a_border);
}

function validateUsername(target, message) {
    const value = target.value;
    if (value == "") {
        message.innerText = "Cannot be blank.";
        validity_obj.username_valid = false;
        updateState(target, "correct_border", "error_border");
    } else if (value.length < 3) {
        message.innerText = "Must have at least 3 characters.";
        validity_obj.username_valid = false;
        updateState(target, "correct_border", "error_border");
    } else if (value.length > 25) {
        message.innerText = "Cannot exceed 25 characters.";
        validity_obj.username_valid = false;
        updateState(target, "correct_border", "error_border");
    } else {
        message.innerText = "";
        validity_obj.username_valid = true;
        updateState(target, "error_border", "correct_border");
    }
};

function validateEmail(target, message) {
    const value = target.value;
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if (regex.test(value) === false) {
        message.innerText = "Enter valid address";
        updateState(target, "correct_border", "error_border");
        validity_obj.email_valid = false;
    } else {
        message.innerText = "";
        updateState(target, "error_border", "correct_border");
        validity_obj.email_valid = true;
    }
};

function validatePassword(target, message) {
    const value = target.value;
    let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/);

    if (regex.test(value) === false) {
        message.innerText = "Password must contain at least one lowercase character, one uppercase character, one number, and one special character from the set (!@#$%^&*).";
        updateState(target, "correct_border", "error_border");
        validity_obj.password_valid = false;
    } else {
        message.innerText = "";
        updateState(target, "error_border", "correct_border");
        validity_obj.password_valid = true;
    }
};

function validateConfirmPassword(target, message) {
    const value = target.value;
    console.log(document.querySelector("#password"));
    console.log(value);
    if (value != document.querySelector("#password").value) {
        message.innerText = "Please enter same password again";
        updateState(target, "correct_border", "error_border");
        validity_obj.confirm_password_valid = false;
    } else {
        message.innerText = "";
        updateState(target, "error_border", "correct_border");
        validity_obj.confirm_password_valid = true;
    }
};

function checkValidityStatus() {
    if (validity_obj.username_valid === true
        && validity_obj.email_valid === true
        && validity_obj.password_valid === true
        && validity_obj.confirm_password_valid === true
    ) {
        return true;
    } else {
        return false;
    }
}


function allValid() {
    const signUpBtn = document.getElementById("signUpBtn");
    console.log(signUpBtn);
    if (checkValidityStatus() && signUpBtn.disabled == true) {
        signUpBtn.toggleAttribute("disabled");
    }
    if (checkValidityStatus() == false && signUpBtn.disabled == false) {
        signUpBtn.toggleAttribute("disabled");
    }
}

let modal = document.getElementById("successModal");
let btn = document.getElementById("signUpBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function (e) {
    e.preventDefault();
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}