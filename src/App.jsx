import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import Songs from "./Songs/Songs";
import Books from "./Books/Books";
import Copyright from "./Copyright/Copyright";
import Contracts from "./Contracts/Contracts";
import SongDetails from "./Songs/SongDetails";
import BookDetails from "./Books/BookDetails";
import CopyrightDetails from "./Copyright/CopyrightDetails";
import AddSong from "./Songs/AddSong";
import AddBook from "./Books/AddBook";
import AddCopyright from "./Copyright/AddCopyright";
import AddContract from "./Contracts/AddContract";
import AddTiraj from "./Tiraje/AddTiraj";
import EditSong from "./Songs/EditSong";
import EditBook from "./Books/EditBook";
import EditCopyright from "./Copyright/EditCopyright";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      isLoggedIn: false,
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

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
              <div className="login">
                <div ref={(ref) => (this.container = ref)}>
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
                <Route path="/contracts/:id/:ID">
                  <Contracts />
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
                <Route path="/addContract/:id/:ID">
                  <AddContract />
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
                <Route path="/editCopyright/:id/:ID">
                  <EditCopyright />
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

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default App;
