//primim date de la baza de date
exports.getAllProducts = (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  db.collection("produse")
    .get()
    .then((data) => {
      let products = [];
      data.forEach((doc) => {
        products.push({
          id: doc.id,
          name: doc.data().name,
          message: doc.data().message,
          price: doc.data().price,
        });
      });
      return response.json(products);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//trimitem date catre baza de bate
exports.postOneProduct = (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  if (request.body.message.trim() === "") {
    return response.status(400).json({ body: "Must not be empty" });
  }

  if (request.body.name.trim() === "") {
    return response.status(400).json({ title: "Must not be empty" });
  }

  const newProduct = {
    name: request.body.name,
    message: request.body.message,
    price: request.body.price,
    createdAt: new Date().toISOString(),
  };
  db.collection("produse")
    .add(newProduct)
    .then((doc) => {
      const responseProduct = newProduct;
      responseProduct.id = doc.id;
      return response.json(responseProduct);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};
//stergem din baza de date
exports.deleteProduct = (request, response) => {
  const document = db.doc(`/produse/${request.params.productId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Product not found" });
      }
      return document.delete();
    })
    .then(() => {
      response.json({ message: "Delete successfull" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
