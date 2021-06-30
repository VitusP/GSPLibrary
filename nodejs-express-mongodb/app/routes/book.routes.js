module.exports = (app) => {
  const books = require("../controllers/book.controller.js");
  const upload = require("../middleware/bookImage.middleware.js");
  var router = require("express").Router();

  //let upload = multer({ storage, fileFilter });

  // Create a new books
  router.post("/", upload, books.create);

  // Retrieve all books
  router.get("/", books.findAll);

  // Retrieve all available books
  router.get("/available", books.findAllAvailable);

  // Retrieve a single books with id
  router.get("/:id", books.findOne);

  // Find by title
  router.get("/:title", books.findOneTitle);

  // Update a books with id
  router.put("/:id", upload, books.update);

  // Delete a books with id
  router.delete("/:id", books.delete);

  // delete books
  router.delete("/", books.deleteAll);

  app.use("/api/books", router);
};
