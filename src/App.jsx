import Navbar from "./Navbar";
import Home from "./Home";
import SongDetails from "./SongDetails";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import Edit from "./Edit";
import React from "react";
import Login from "./Login";
import Register from "./Register";

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
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
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
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/songs/:id">
                <SongDetails />
              </Route>
              <Route path="/edit/:id">
                <Edit />
              </Route>
              <Route paht="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
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
