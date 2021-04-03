
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function Navigation() {
  const location = useLocation();
  const history = useHistory();

  function handleSignOut() {
    auth.signOut().then(() => {
      alert("Sign Out Successful.")
      history.push("/");
    }).catch(error => {
      alert(error)
    })
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/home">
        <Navbar.Brand className="brand size-large">Pour It Up</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link
            to="/home"
            className={
              location.pathname === "/home" ? "nav-link active" : "nav-link"
            }
          >
            <i className="fa fa-fw fa-user"></i>
            Home
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
          <button onClick={handleSignOut}>
            Sign Out
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
