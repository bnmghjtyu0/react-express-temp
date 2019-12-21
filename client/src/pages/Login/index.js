import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import "./login.scss";
import { actLogin } from "../../redux/actions";
import server from "../../server/index";

const Login = props => {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [formRegister, setFormRegister] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const _apiSignUp = async () => {
    const res = await server._apiAuth("users/register", formRegister);
    console.log("sign", res);
  };

  const _apiLogin = async () => {
    const res = await server._apiAuth("users/login", form);
    console.log("signin", res);
    if (res.data.retCode === 1) {
      localStorage.setItem("token", res.data.retData.token);
      history.push("/");
      dispatch(actLogin());
    } else {
      localStorage.removeItem("token");
    }
  };

  const sendFormSignUp = async e => {
    e.preventDefault();
    _apiSignUp();
  };

  const sendFormSignIn = async e => {
    e.preventDefault();
    _apiLogin();
  };
  return (
    <div className="App-header">
    <h2 className="login-title">後台系統</h2>
      <div className="login">
        <div className="left">
        <h4>註冊</h4>
          <form onSubmit={sendFormSignUp}>
            <div className="form-group mb-2">
              <div className="mr-2">
                <input
                  className="form-control mr-2 mb-2"
                  placeholder="請輸入名稱"
                  required
                  value={formRegister.name}
                  onChange={e => {
                    setFormRegister({
                      ...formRegister,
                      name: e.target.value
                    });
                  }}
                />
                <input
                  className="form-control mr-2 mb-2"
                  type="email"
                  placeholder="請輸入信箱"
                  required
                  value={formRegister.email}
                  onChange={e => {
                    setFormRegister({
                      ...formRegister,
                      email: e.target.value
                    });
                  }}
                />
                <input
                  className="form-control"
                  placeholder="請輸入密碼"
                  type="password"
                  required
                  value={formRegister.password}
                  onChange={e => {
                    setFormRegister({
                      ...formRegister,
                      password: e.target.value
                    });
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-sm btn-info submit">
              註冊
            </button>
          </form>
        </div>
        <div className="right">
        <h4>登入</h4>
          <form onSubmit={sendFormSignIn}>
            <div className="form-group">
              <input
                className="form-control mr-2 mb-2"
                type="email"
                placeholder="請輸入信箱"
                required
                value={form.email}
                onChange={e => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
              <input
                className="form-control"
                placeholder="請輸入密碼"
                type="password"
                required
                value={form.password}
                onChange={e => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
            </div>
            <button type="submit" className="btn btn-sm btn-success submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
