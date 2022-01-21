// Selectori

const email = document.querySelector(".input-email");
const password = document.querySelector(".input-password");
const signUpButton = document.querySelector(".register");
const signInButton = document.querySelector(".signin");
const errors = document.querySelector(".error");

//Metoda de inregistrare admin ---> Nu ar trebui sa existe --> Doar de test

signUpButton.addEventListener("click", function (e) {
  e.preventDefault();
  auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      errors.innerText = `Registered succesfully!`;
    })
    .catch((error) => {
      console.log(error);
      let errorMessage = error.message;
      errors.innerText = `${errorMessage}`;
    });
});

// Metoda de logare admin

signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      location.replace("./tabel.html");
    })
    .catch((error) => {
      // console.log(error);
    });
});

// Metoda de deconectare

// signOutBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   auth
//     .signOut()
//     .then(() => {})
//     .catch((error) => {
//       console.log(error);
//     });
// });
