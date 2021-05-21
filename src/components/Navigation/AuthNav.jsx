import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const AuthNav = () => {
  return (
    <>
      <Button variant="secondary" className="m-2">
        <NavLink
          to="/register"
          className="nav__link"
          activeClassName="active__link"
        >
          Sign out
        </NavLink>
      </Button>
      <Button variant="secondary" className="m-2">
        <NavLink
          to="/login"
          className="nav__link"
          activeClassName="active__link"
        >
          Log In
        </NavLink>
      </Button>
    </>
  );
};
