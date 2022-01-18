const email = document.querySelector(".input-email");
const password = document.querySelector(".input-password");
const signUpButton = document.querySelector(".signup");
const signInButton = document.querySelector(".signin");
const signOut = document.querySelector(".signout");
const errors = document.querySelector(".error");
const loginContainer = document.querySelector(".login-form");

signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      loginContainer.style.display = "none";
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      // console.log(errorCode);
      errors.innerText = `${errorMessage}`;
    });
});

signOut.addEventListener("click", (e) => {
  e.preventDefault();
  loginContainer.style.display = "";
  errors.innerText = "";
  auth
    .signOut()
    .then(() => {
      console.log("Sign out succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
