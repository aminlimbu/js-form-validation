const form = document.querySelector("#form");

function validateUsername() {
  let valid = false;
  const min = 3,
    max = 25;
  const username = document.querySelector("#username");
  if (username.value.trim() === "") {
    showError(username, "Username cannot be blank.");
  } else if (username.value.length < min || username.value.length > max) {
    showError(
      username,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(username);
    valid = true;
  }
  return valid;
}

const validateEmail = () => {
  let valid = false;
  const email = document.querySelector("#email");
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = re.test(email.value);

  if (email.value.trim() === "") {
    showError(email, "Email is required.");
  } else if (!validEmail) {
    showError(email, "Email is not valid.");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

const validatePassword = () => {
  let valid = false;
  const passwordElement = document.querySelector("#password");
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const validPassword = re.test(passwordElement.value);
  console.log(password);
  if (passwordElement.value.trim() === "") {
    showError(passwordElement, "Password cannot be blank.");
  } else if (!validPassword) {
    showError(
      passwordElement,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordElement);
    valid = true;
  }
  return valid;
};

const validateConfirmPassword = () => {
  let valid = false;
  const password = document.querySelector("#password").value.trim();
  const confirmPasswordElement = document.querySelector("#confirm-password");
  const confirmPassword = confirmPasswordElement.value.trim();
  if (confirmPassword === "" || confirmPassword === null) {
    showError(confirmPasswordElement, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordElement, "The password does not match");
  } else {
    showSuccess(confirmPasswordElement);
    valid = true;
  }
  return valid;
};

function showError(input, message) {
  const parentElement = input.parentElement;
  parentElement.classList.remove("success");
  parentElement.classList.add("error");

  const error = parentElement.querySelector("small");
  error.style.color = "red";
  error.textContent = message;
}

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.submitter.id === "login") {
    validateUsername();
    validatePassword();
  } else {
    let isUsernameValid = validateUsername(),
      isEmailValid = validateEmail(),
      isPasswordValid = validatePassword(),
      isConfirmPasswordValid = validateConfirmPassword();

    let isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;
  }
  //   validation complete
  //   if (isFormValid) {
  //   }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        validateUsername();
        break;
      case "email":
        validateEmail();
        break;
      case "password":
        validatePassword();
        break;
      case "confirm-password":
        validateConfirmPassword();
        break;
    }
  })
);
