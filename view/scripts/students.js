//constants
const button = document.querySelector("#submit-button");
const getName = document.getElementById("name");
const getSecondName = document.querySelector("#lname");
const getDate = document.querySelector("#b-date");
const getNumber = document.querySelector("#phone-number");
const getDomain = document.querySelector("#spec");
const year = document.querySelector("#year");
const page = document.querySelector("#add-student");
const info = document.querySelector(".hero");

page.onclick = () => location.replace("./index.html");

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
  createUser(student);
  console.log(student);
});
//send director
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
