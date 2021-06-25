import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChangeAvailable = this.onChangeAvailable.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
    this.onChangeOwnerContact = this.onChangeOwnerContact.bind(this);
    this.onChangeOwnerCohort = this.onChangeOwnerCohort.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      isbn: "",
      author: "",
      available: true,
      class: "",
      owner: {
        name: "",
        contact: "",
        cohort: 0,
      },

      selectedFile: null,
      submitted: false,
    };
  }

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleChange(e) {
      this.setState({
        [e.target.name] : e.target.value
      }, () => {console.log(this.state)});
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeIsbn(e) {
    this.setState({
      isbn: e.target.value,
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value,
    });
  }

  onChangeAvailable(e) {
    var availableQuest = true;
    if (e.target.value !== "true") {
      availableQuest = false;
    }
    this.setState({
      available: availableQuest,
    });
  }

  onChangeClass(e) {
    this.setState({
      class: e.target.value,
    });
  }

  onChangeOwnerName(e) {
    var owner = { ...this.state.owner };
    owner.name = e.target.value;
    this.setState({
      owner,
    }, () => {console.log(this.state)});
  }

  onChangeOwnerContact(e) {
    var owner = { ...this.state.owner };
    owner.contact = e.target.value;
    this.setState({
      owner,
    }, () => {console.log(this.state)});
  }

  onChangeOwnerCohort(e) {
    var owner = { ...this.state.owner };
    owner.cohort = e.target.value;
    this.setState({
      owner,
    }, () => {console.log(this.state)});
  }

  saveBook() {
    const formData = new FormData();
    formData.append("photo", this.state.selectedFile);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("isbn", this.state.isbn);
    formData.append("author", this.state.author);
    formData.append("available", this.state.available);
    formData.append("class", this.state.class);
    formData.append("owner[name]", this.state.owner.name);
    formData.append("owner[contact]", this.state.owner.contact);
    formData.append("owner[cohort]", this.state.owner.cohort);

    console.log(formData);
    BookDataService.create(formData)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          isbn: response.data.isbn,
          author: response.data.author,
          class: response.data.class,
          owner: response.data.owner,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newBook() {
    var owner_temp = {
      name: "",
      contact: "",
      cohort: 0,
    };
    this.setState({
      title: "",
      description: "",
      isbn: "",
      author: "",
      class: "",
      available: true,
      owner: owner_temp,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Add New Book
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.handleChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.handleChange}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                required
                value={this.state.isbn}
                onChange={this.handleChange}
                name="isbn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.handleChange}
                name="author"
              />
            </div>

            <div className="form-group">
              <label htmlFor="class">Class</label>
              <input
                type="text"
                className="form-control"
                id="class"
                required
                value={this.state.class}
                onChange={this.handleChange}
                name="class"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerName">Owner Name</label>
              <input
                type="text"
                className="form-control"
                id="ownerName"
                required
                value={this.state.owner.name}
                onChange={this.onChangeOwnerName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerContact">Owner Contact</label>
              <input
                type="text"
                className="form-control"
                id="ownerContact"
                required
                value={this.state.owner.contact}
                onChange={this.onChangeOwnerContact}
                name="contact"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerCohort">Owner Cohort</label>
              <input
                type="number"
                className="form-control"
                id="ownerCohort"
                required
                value={this.state.owner.cohort}
                onChange={this.onChangeOwnerCohort}
                name=" ohort"
              />
            </div>

            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={this.state.available === true}
                  onChange={this.onChangeAvailable}
                />
                Available
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={this.state.available === false}
                  onChange={this.onChangeAvailable}
                />
                Not available
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="formGroupBookPicture">Upload Book Picture</label>
              <input id="formGroupBookPicture" type="file" onChange={this.onFileChange} />
            </div>

            <button onClick={this.saveBook} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
