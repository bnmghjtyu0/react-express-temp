import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import server from './server/index'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [form, setForm] = React.useState({ email: '', password: '' })
  const [formRegister, setFormRegister] = React.useState({ name: '', email: '', password: '' })
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    _apiDemo()
  }, []);

  const _apiSignUp = async () => {
    const res = await server._apiAuth('users/register', formRegister)
    console.log('sign', res)
  }

  const _apiLogin = async () => {
    const res = await server._apiAuth('users/login', {
      'email': 'richard.liao@program.com.tw',
      'password': '1qaz@WSX'
    })
    console.log('login', res)
    if (res.data.retCode === 1) {
      localStorage.setItem('token', res.data.retData.token)
    } else {
      localStorage.setItem('token', '')
    }
  }
  const _apiDemo = async () => {
    const res = await server._apiFull('demo')
    setData(res.data)
  }

  const sendFormSignUp = async (e) => {
    e.preventDefault();
    _apiSignUp()
  }

  const sendFormSignIn = async (e) => {
    e.preventDefault();
    _apiLogin()
  }


  return (
    <div className="App">


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!!localStorage.getItem('token')
          && <div>
            <p>{data.title}</p>
            <div>
              <button onClick={() => localStorage.removeItem('token')}>logout</button>
            </div>
          </div>
        }
        {!localStorage.getItem('token') &&
          <div>
            <form onSubmit={sendFormSignUp}>
              <div className="form-group mb-2">
                <div className="mr-2">
                  <input className="form-control mr-2 mb-2" placeholder="請輸入名稱" value={formRegister.name} onChange={(e) => {
                    setFormRegister({ ...formRegister, name: e.target.value })
                  }} />
                  <input className="form-control mr-2 mb-2" placeholder="請輸入帳號" value={formRegister.email} onChange={(e) => {
                    setFormRegister({ ...formRegister, email: e.target.value })
                  }} />
                  <input className="form-control" placeholder="請輸入密碼" value={formRegister.password} onChange={(e) => {
                    setFormRegister({ ...formRegister, password: e.target.value })
                  }} />
                </div>
                <button type="submit" className="btn btn-sm btn-info">註冊</button>
              </div>
            </form>
            <form onSubmit={sendFormSignIn}>
              <div className="form-group">
                <input className="form-control mr-2 mb-2" placeholder="請輸入帳號" value={form.email} onChange={(e) => {
                  setForm({ ...form, email: e.target.value })
                }} />
                <input className="form-control" placeholder="請輸入密碼" value={form.password} onChange={(e) => {
                  setForm({ ...form, password: e.target.value })
                }} />
              </div>
              <button type="submit" className="btn btn-sm btn-success">登入</button>
            </form>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
