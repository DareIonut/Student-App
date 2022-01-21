/* Acest API este rulat pe Firebase si foloseste Firebase Firestore care este o baza de date de tip NoSQL unde stocam date in format JSON */

// Module
const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const { db } = require("./admin");

//Allowing CORS stuff
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Setam endpointurile API-ului si functia fiecaruia

// Creeam in baza de date un student
app.post("/create", (req, res) => {
  (async () => {
    try {
      const student = {
        nume: req.body.nume,
        prenume: req.body.prenume,
        data: req.body.data,
        telefon: req.body.telefon,
        specializare: req.body.specializare,
        an: req.body.an,
      };
      await db
        .collection("items")
        .add(student)
        .then(() => {});
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// Citim toti studentii
app.get("/read", (req, res) => {
  (async () => {
    try {
      let query = db.collection("items");
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            nume: doc.data().nume,
            prenume: doc.data().prenume,
            data: doc.data().data,
            telefon: doc.data().telefon,
            specializare: doc.data().specializare,
            an: doc.data().an,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// Stergem un student
app.delete("/api/delete/:item_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.item_id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// Initializam API
exports.api = functions.https.onRequest(app);
