import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={require("./Logo.png")}></img>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Adaugă cântare</Link>
      </div>
    </nav>
  );
};

export default Navbar;
