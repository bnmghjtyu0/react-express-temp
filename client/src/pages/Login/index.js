import React from "react";
import { useDispatch } from "react-redux";
import { authStatus } from "../../redux/actions";
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
const Login = () => {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [formRegister, setFormRegister] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const _apiSignUp = async () => {
    const res = await server._apiAuth("users/register", formRegister);
    console.log("sign", res);
  };

  const _apiLogin = async () => {
    const res = await server._apiAuth("users/login", form);
    if (res.data.retCode === 1) {
      localStorage.setItem("token", res.data.retData.token);
      dispatch(authStatus(true));
    } else {
      localStorage.setItem("token", "");
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
      <form onSubmit={sendFormSignUp}>
        <div className="form-group mb-2">
          <div className="mr-2">
            <input
              className="form-control mr-2 mb-2"
              placeholder="請輸入名稱"
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
              placeholder="請輸入信箱"
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
              value={formRegister.password}
              onChange={e => {
                setFormRegister({
                  ...formRegister,
                  password: e.target.value
                });
              }}
            />
          </div>
          <button type="submit" className="btn btn-sm btn-info">
            註冊
          </button>
        </div>
      </form>
      <form onSubmit={sendFormSignIn}>
        <div className="form-group">
          <input
            className="form-control mr-2 mb-2"
            placeholder="請輸入信箱"
            value={form.email}
            onChange={e => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <input
            className="form-control"
            placeholder="請輸入密碼"
            type="password"
            value={form.password}
            onChange={e => {
              setForm({ ...form, password: e.target.value });
            }}
          />
        </div>
        <button type="submit" className="btn btn-sm btn-success">
          登入
        </button>
      </form>
    </div>
  );
};
export default Login;
