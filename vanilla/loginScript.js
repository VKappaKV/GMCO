const switchers = [...document.querySelectorAll(".switcher")];

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});

const login_form = document.querySelector(".form-login");
const login_email = document.querySelector(".login-email");
const login_password = document.querySelector(".login-password");

login_form.addEventListener =
  ("submit",
  (event) => {
    event.preventDefault();
    validateForm();
  });

const signup_form = document.querySelector(".form-signup");
const signup_email = document.querySelector(".signup-email");
const signup_password = document.querySelector(".signup-password");
const signup_password_confirm = document.querySelector(
  ".signup-password-confirm"
);
const signup_button = document.querySelector(".btn-signup");
console.log(signup_button);

signup_form.addEventListener =
  ("submit",
  (event) => {
    event.preventDefault();
    validateForm();
  });

function validateForm() {
  console.log("Sign up");
}

console.log("hello");
console.log(signup_form);
