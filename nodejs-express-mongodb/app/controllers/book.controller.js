const db = require("../models");
const Book = db.books;
const fs = require("fs");
const mainPath = __dirname.substr(0, __dirname.length - 15);

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    if (req.file) {
      fs.unlink(mainPath + req.file.path, (err) => {
        if (err) throw err;
        console.log(`${__dirname + req.file.path} was deleted`);
      });
    }
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create book
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    isbn: req.body.isbn,
    author: req.body.author,
    available: req.body.available ? req.body.available : false,
    class: req.body.class,
    owner: {
      name: req.body.owner.name,
      contact: req.body.owner.contact,
      cohort: req.body.owner.cohort,
    },
    image: req.file ? req.file.path : "",
  });

  // Save book to db
  book
    .save(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};

// Retrieve all Book from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Book.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Book with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Book with id=" + id });
    });
};

// find book by title
exports.findOneTitle = (req, res) => {
  const title = req.params.title;

  Book.find({ title: title })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Book with title " + title });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Book with title=" + title });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  if (!req.body || !req.body.title) {
    if (req.file) {
      fs.unlink(mainPath + req.file.path, (err) => {
        if (err) throw err;
        console.log(`${__dirname + req.file.path} was deleted`);
      });
    }
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = req.params.id;
  let prevImagePath;

  Book.findById(id)
    .then((data) => {
      if (data) prevImagePath = data.image ? data.image : "";
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating Book with id=" + id });
    });

  // Update book
  const book = {
    title: req.body.title,
    description: req.body.description,
    isbn: req.body.isbn,
    author: req.body.author,
    available: req.body.available ? req.body.available : false,
    class: req.body.class,
    owner: {
      name: req.body.owner.name,
      contact: req.body.owner.contact,
      cohort: req.body.owner.cohort,
    },
    image: req.file ? req.file.path : "",
  };

  Book.findByIdAndUpdate(id, book, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Book was not found!`,
        });
      } else {
        res.send({ message: "Book was updated successfully." });
        if (prevImagePath) {
          fs.unlink(mainPath + prevImagePath, (err) => {
            if (err) throw err;
            console.log(`${__dirname + prevImagePath} was deleted`);
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Book with id=" + id,
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      } else {
        // Delete file
        if (data.image) {
          fs.unlink(mainPath + data.image, (err) => {
            if (err) throw err;
            console.log(`${__dirname + data.image} was deleted`);
          });
        }
        res.send({
          message: "Book was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id,
      });
    });
};

// Delete all Book from the database.
exports.deleteAll = (req, res) => {
  // Find all book and delete their files
  Book.find({})
    .then((data) => {
      data.forEach((listedBook) => {
        // Delete file
        if (listedBook.image) {
          fs.unlink(mainPath + listedBook.image, (err) => {
            if (err) throw err;
            console.log(`${__dirname + listedBook.image} was deleted`);
          });
        }
      });

      Book.deleteMany({})
        .then((data) => {
          console.log(data);
          res.send({
            message: `${data.deletedCount} Book were deleted successfully!`,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Book.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting books.",
      });
    });
};

// Find all published Book
exports.findAllAvailable = (req, res) => {
  Book.find({ available: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Book.",
      });
    });
};
