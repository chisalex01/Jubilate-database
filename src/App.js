import Navbar from "./Navbar";
import Home from "./Home";
import SongDetails from "./SongDetails";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import Edit from "./Edit";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/Songs/:id">
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

export default App;
