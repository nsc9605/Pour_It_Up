import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Avatar from "../ProfilePage/index";

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
        <Navbar.Brand className="brand size-large">Pour It Up </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
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
          <Link
            to="/contact"
            className={
              location.pathname === "/contact" ? "nav-link active" : "nav-link"
            }
          >
            <i className="fa fa-fw fa-envelope"></i>
            Contact
          </Link>
          <Avatar />
          {/* <Link to="/profile" 
          className={
            location.path === "/profile" ? "nav-link active" : "nav-link"
            }>
          <Avatar />
          </Link> */}
          <button classname="rounded"onClick={handleSignOut}>Sign Out</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
