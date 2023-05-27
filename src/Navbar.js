import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={require("./Logo.png")}></img>
      <div className="links">
        <Link to="/songs">Cântări</Link>
        <Link to="/books">Culegeri</Link>
      </div>
    </nav>
  );
};

export default Navbar;
