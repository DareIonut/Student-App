//selectors
const table = document.querySelector(".add-table");
const page = document.querySelector(".add-student");

page.onclick = () => location.replace("./students.html");

const createStudent = async () => {
  try {
    const response = await axios.get(
      `https://us-central1-auth-pair.cloudfunctions.net/api/read`
    );
    const students = response.data;

    //foreach data (JSON) build a new <tr> table row
    students.forEach((element) => {
      //create <tr> element
      let tr = document.createElement("tr");
      tr.classList.add(`${element.id}`);

      //setting the data inside tr element
      tr.innerHTML = `<th scope="row">${element.id}</th>
    <td>${element.nume}</td>
    <td>${element.prenume}</td>
    <td>${element.data}</td>
    <td>${element.telefon}</td>
    <td>${element.specializare}</td>
    <td>${element.an}</td>
    <td id="table-delete"><button id="deleteIT">🗑️</button></td>`;

      //append each component to the table (display)
      table.appendChild(tr);
    });
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

createStudent();

document.addEventListener("click", function (e) {
  if (e.target.id == "deleteIT") {
    let shoot = e.target.parentNode.parentNode;
    shoot.classList.add("slide-out-right");
    shoot.addEventListener("animationend", () => {
      shoot.classList.remove("slide-out-right");
      shoot.remove();
      let id = e.target.parentNode.parentNode.classList.value;
      deleteUser(id);
    });
  }
});

const deleteUser = (id) => {
  axios
    .delete(
      `https://us-central1-auth-pair.cloudfunctions.net/api/api/delete/${id}`
    )
    .then((response) => {
      console.log(`DELETE: user is removed`, id);
    })
    .catch((error) => console.error(error));
};
