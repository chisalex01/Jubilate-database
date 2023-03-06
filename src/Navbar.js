import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={require("./Logo.png")}></img>
      <div className="links">
        <Link to="/home">Acasă</Link>
        <Link to="/addData">Adăugă date</Link>
      </div>
    </nav>
  );
};

export default Navbar;
