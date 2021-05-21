const getIsAuthenticated = state => state.auth.loggedIn;

const getUsername = state => state.auth.user.name;

const selectors = { getIsAuthenticated, getUsername };
export default selectors;
