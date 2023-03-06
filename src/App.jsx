import Navbar from "./Navbar";
import Home from "./Home";
import SongDetails from "./SongDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddSong from "./AddSong";
import EditSong from "./EditSong";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import AddData from "./AddData";
import AddBook from "./AddBook";

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
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/addData">
                  <AddData />
                </Route>
                <Route path="/addBook">
                  <AddBook />
                </Route>
                <Route path="/addSong">
                  <AddSong />
                </Route>
                <Route path="/song/:id">
                  <SongDetails />
                </Route>
                <Route path="/editSong/:id">
                  <EditSong />
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
