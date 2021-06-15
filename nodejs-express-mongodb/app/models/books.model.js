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
          owner:
          {
              name: String,
              contact: String,
              cohort: Number
          },
          img: 
          {
              data: Buffer,
              contentType: String
          }


        },
        { timestamps: true }
      )
    );
  
    return Books;
  };