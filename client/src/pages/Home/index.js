import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import withLayout from "../../container/withLayout";
import logo from "../../logo.svg";
import server from "../../server/index";
const Home = () => {
  const [data, setData] = React.useState({});
  
  React.useEffect(() => {
    _apiDemo();
  }, []);

  const _apiDemo = async () => {
    const res = await server._apiFull("get", "demo");
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
