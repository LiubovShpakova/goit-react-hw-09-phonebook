import { useSelector } from 'react-redux';
import selectors from '../../redux/auth/auth-selectors';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthNav } from './AuthNav';
import styled from 'styled-components';
import UserMenu from './UserMenu';

const Styles = styled.div`
  a,
  .navbar-brand,
  navbar-nav .nav-link {
    color: #d1abc4;
    &:hover {
      color: white;
    }
  }
`;

export default function AppBar() {
  const isAuthenticated = useSelector(selectors.getIsAuthenticated);

  return (
    <>
      <Styles>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Phonebook</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link>
                  <NavLink
                    exact
                    to="/"
                    className="nav__link"
                    activeClassName="active__link"
                  >
                    Home
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  {isAuthenticated && (
                    <NavLink
                      to="/contacts"
                      className="nav__link"
                      activeClassName="active__link"
                    >
                      Contacts
                    </NavLink>
                  )}
                </Nav.Link>
              </Nav>
              <Nav>{isAuthenticated ? <UserMenu /> : <AuthNav />}</Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Styles>
    </>
  );
}
