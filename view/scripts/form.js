// Selectori
const button = document.querySelector("#submit-button");
const form = document.querySelector("#form");
const getName = document.getElementById("name");
const getSecondName = document.querySelector("#lname");
const getDate = document.querySelector("#b-date");
const getNumber = document.querySelector("#phone-number");
const getDomain = document.querySelector("#spec");
const year = document.querySelector("#year");
const page = document.querySelector("#add-student");
const info = document.querySelector(".hero");

// Setare eventuri butoane
page.onclick = () => location.replace("./tabel.html");

button.addEventListener("click", (e) => {
  e.preventDefault();
  let student = {
    nume: getName.value,
    prenume: getSecondName.value,
    data: getDate.value,
    telefon: getNumber.value,
    specializare: getDomain.value,
    an: year.value,
  };

  // Creeam userul in baza de date
  createUser(student);
  e.preventDefault();
});

// Requestul pentru trimitere date la firebase
const createUser = (user) => {
  axios
    .post("https://us-central1-auth-pair.cloudfunctions.net/api/create", user)
    .then((response) => {
      info.innerText = "Adaugat cu succes!";
      setTimeout(() => {
        info.innerText = "";
      }, 1000);
      getName.value = "";
      getSecondName.value = "";
      getDate.value = "";
      getDomain.value = "";
      getNumber.value = "";
      year.value = "";
    })
    .catch((error) => console.error(error));
};
