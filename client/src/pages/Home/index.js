import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import withLayout from "../../container/withLayout";
import logo from "../../logo.svg";
import server from "../../server/index";

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

const Home = () => {
  const [data, setData] = React.useState({});
  let { from } = !localStorage.getItem("token") || {
    from: { pathname: "/login" }
  };
  let history = useHistory();
  React.useEffect(() => {
    _apiDemo();
  }, []);

  const _apiDemo = async () => {
    const res = await server._apiFull("demo");
    setData(res.data);
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <p>{data.title}</p>
      </div>
    </header>
  );
};
export default withLayout(Home);
