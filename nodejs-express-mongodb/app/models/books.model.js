module.exports = mongoose => {
    const Books = mongoose.model(
      "books",
      mongoose.Schema(
        {
          title: String,
          description: String,
          isbn: String,
          author: String,
          available: Boolean,
          class: String,
          owner:
          {
              name: String,
              contact: String,
              cohort: Number
          },
          image: String
        },
        { timestamps: true }
      )
    );
  
    return Books;
  };