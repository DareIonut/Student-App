// Selectori globali
const table = document.querySelector(".student-list");
const updateBtn = document.querySelector(".update");

// Apelam functia pentru a primi datele din tabel
getData();

// Setare button pentru a obtinerea datelor in mod asincron
updateBtn.onclick = () => getData();

// Functie asincrona pentru obtinerea datelor de la API
async function getData() {
  const dataFetch = await fetch(
    "https://us-central1-auth-pair.cloudfunctions.net/api/read",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  // Obtinere date JSON
  // 📓 APi-ul ne returneaza un array de JSON reprezentand fiecare student
  const data = await dataFetch.json();

  // Apelam functia create student
  createStudent(data);
}

const createStudent = (data) => {
  // Stergem datele din tabel inainte pentru update - evitam suprascrierea
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Pentru fiecare student se creeaza o coloana noua in tabel cu datele acestuia
  data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.classList.add(element.id);

    // Setam datele in tabel
    tr.innerHTML = `<th scope="row">${element.id}</th>
    <td>${element.nume}</td>
    <td>${element.prenume}</td>
    <td>${element.data}</td>
    <td>${element.telefon}</td>
    <td>${element.specializare}</td>
    <td>${element.an}</td>
    <td id="btn-container"><button id="btn-delete">🗑️</button></td>`;

    // Tabelul o sa primeasca o noua coloana
    table.appendChild(tr);
  });
};

// Functionalitatea butonului de stergere
document.addEventListener("click", (e) => {
  if (e.target.id == "btn-delete") {
    let woodCircle = e.target.parentNode.parentNode;
    woodCircle.classList.add("slide-out-right");
    woodCircle.addEventListener("animationend", () => {
      woodCircle.classList.remove("slide-out-right");
      woodCircle.remove();

      // Selectam ID-ul studentului
      let firstCircleID = e.target.parentNode.parentNode.classList.value;

      // Stergem din baza de date
      deleteUser(firstCircleID);
    });
  }
});

// Trimitem catre API ca dorim sa stergem din baza de date
const deleteUser = (id) => {
  axios
    .delete(
      `https://us-central1-auth-pair.cloudfunctions.net/api/api/delete/${id}`
    )
    .then((response) => {
      // Debug purpose
      // console.log(`Studentul a fost sters.`);
    })
    .catch((error) => console.error(error));
};
