import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then((response) => {
        this.setState({
          books: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1,
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index,
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    BookDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          books: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, books, currentBook, currentIndex } =
      this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Book List</h4>

          <ul className="list-group">
            {books &&
              books.map((book, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBooks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBook? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBook.description}
              </div>
              <div>
                <label>
                  <strong>ISBN:</strong>
                </label>{" "}
                {currentBook.isbn}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentBook.author}
              </div>
              <div>
                <label>
                  <strong>class:</strong>
                </label>{" "}
                {currentBook.class}
              </div>
              <div>
                <label>
                  <strong>Owner name:</strong>
                </label>{" "}
                {currentBook.owner.name}
              </div>
              <div>
                <label>
                  <strong>Owner email:</strong>
                </label>{" "}
                {currentBook.owner.contact}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentBook.available ? "Available" : "Not Available"}
              </div>

              <Link
                to={"/books/" + currentBook.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Book...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
