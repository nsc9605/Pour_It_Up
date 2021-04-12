import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Avatar from "../ProfilePage/index";
import cocktail from "../../assets/img/logo.png";

function Navigation() {
  const location = useLocation();
  const history = useHistory();

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        alert("Sign Out Successful.");
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="info" variant="dark">
      <Link to="/">
        <Navbar.Brand className="brand size-large">Pour It Up</Navbar.Brand>
      </Link>
      <img src={cocktail} alt={cocktail} className="brandImg" />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link
            to="/about"
            className={
              location.pathname === "/about" ? "nav-link active" : "nav-link"
            }
          >
            <i className="fa fa-fw fa-envelope"></i>
            About
          </Link>
          <Link
            to="/search"
            className={
              location.pathname === "/search" ? "nav-link active" : "nav-link"
            }
          >
            <i className="fa fa-fw fa-user"></i>
            Search
          </Link>
          <Link
            to="/favorites"
            className={
              location.pathname === "/favorites"
                ? "nav-link active"
                : "nav-link"
            }
          >
            <i className="fa fa-fw fa-heart"></i>
            Favorites
          </Link>
          <Avatar />
          <button className="rounded" onClick={handleSignOut}>
            Sign Out
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
