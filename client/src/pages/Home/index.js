import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import withLayout from "../../container/withLayout";
import logo from "../../logo.svg";
import server from "../../server/index";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
const responseFacebook = response => {
  console.log(response);
};
const responseGoogle = response => {
  console.log(response);
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
      <div className="form-inline">
        <GoogleLogin
          clientId="32250892194-hpgfm9jm2d7mjkho5cuvoolaumqgo7ji.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="mr-3"
        />
        <FacebookLogin
          appId="1088597931155576"
          autoLoad={false}
          fields="name,email,picture"
          // onClick={componentClicked}
          cssClass="my-facebook-button-class"
          callback={responseFacebook}
          render={renderProps => (
            <button onClick={renderProps.onClick} className="btn btn-sm btn-primary">
              登入 facebook
            </button>
          )}
        />
      </div>
    </header>
  );
};
export default withLayout(Home);
