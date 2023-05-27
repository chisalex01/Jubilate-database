import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Songs from "./Songs";
import Books from "./Books";
import Copyright from "./Copyright";
import SongDetails from "./SongDetails";
import BookDetails from "./BookDetails";
import CopyrightDetails from "./CopyrightDetails";
import AddSong from "./AddSong";
import AddBook from "./AddBook";
import AddCopyright from "./AddCopyright";
import AddTiraj from "./AddTiraj";
import EditSong from "./EditSong";
import EditBook from "./EditBook";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
    };
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
    }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Înregistrare" : "Autentificare";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <div className="content">
                <div className="login">
                  <div
                    className="container"
                    ref={(ref) => (this.container = ref)}
                  >
                    {isLogginActive && (
                      <Login containerRef={(ref) => (this.current = ref)} />
                    )}
                    {!isLogginActive && (
                      <Register containerRef={(ref) => (this.current = ref)} />
                    )}
                  </div>
                  <RightSide
                    current={current}
                    currentActive={currentActive}
                    containerRef={(ref) => (this.rightSide = ref)}
                    onClick={this.changeState.bind(this)}
                  />
                </div>
              </div>
            </Route>
            <>
              <Navbar />
              <>
                <Route path="/songs">
                  <Songs />
                </Route>
                <Route path="/books">
                  <Books />
                </Route>
                <Route path="/copyright/:id">
                  <Copyright />
                </Route>
                <Route path="/addSong">
                  <AddSong />
                </Route>
                <Route path="/addBook">
                  <AddBook />
                </Route>
                <Route path="/addCopyright/:id">
                  <AddCopyright />
                </Route>
                <Route path="/addTiraj/:id">
                  <AddTiraj />
                </Route>
                <Route path="/songDetails/:id">
                  <SongDetails />
                </Route>
                <Route path="/bookDetails/:id">
                  <BookDetails />
                </Route>
                <Route path="/copyrightDetails/:id/:ID">
                  <CopyrightDetails />
                </Route>
                <Route path="/editSong/:id">
                  <EditSong />
                </Route>
                <Route path="/editBook/:id">
                  <EditBook />
                </Route>
              </>
            </>
          </Switch>
        </div>
      </Router>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side right"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
