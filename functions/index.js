const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const { db } = require("./admin");

//Allowing CORS stuff

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// create
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
// read item
app.get("/read/:item_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.item_id);
      let item = await document.get();
      let response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// read all
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

// update
app.put("/update/:item_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.item_id);
      await document.update({
        item: req.body.item,
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// delete
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

exports.api = functions.https.onRequest(app);
