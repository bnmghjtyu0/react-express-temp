import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";

const NoMatch = () => {
  return <div>404</div>;
};
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
function App() {
  const { toggle } = useSelector(state => state.authReducer);
  let history = useHistory();
  let { from } = !localStorage.getItem("token") || { from: { pathname: "/" } };
  React.useEffect(() => {
    if (from) {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
    }
  });
  return (
    <Switch>
      <Route path="/login" children={<Login />} />
      <PrivateRoute exact path="/">
        <Home />
      </PrivateRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
