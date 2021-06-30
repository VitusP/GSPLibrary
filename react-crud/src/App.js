import "./App.css";
import React, { Component } from "react";
import { Link, Switch, Route } from 'react-router-dom';
import AddBook from "./components/add-book.component";
import BooksList from "./components/book-list.component"
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/books" className="navbar-brand">
            GSPLibrary
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={BooksList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/books/:id" component={AddBook} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
