import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [form, setForm] = React.useState({ email: '', password: '' })
  const [data, setData] = React.useState({});

  const getTitle = async () => {
    const res = await axios.get("/backend/demo", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    setData(res.data)
  }
  React.useEffect(() => {
    getTitle()
  }, []);

  const sendForm = (e) => {
    e.preventDefault();
    axios.post("/backend/users/login", {
      'email': form.email,
      'password': form.password
    }).then(res => {
      if (res.data.retCode === 1) {
        localStorage.setItem('token', res.data.retData.token)
      } else {
        localStorage.setItem('token', '')
      }
    });
  }


  return (
    <div className="App">
      <form onSubmit={sendForm}>
        <input placeholder="請輸入帳號" value={form.email} onChange={(e) => {
          setForm({ ...form, email: e.target.value })
        }} />
        <input placeholder="請輸入密碼" value={form.password} onChange={(e) => {
          setForm({ ...form, password: e.target.value })
        }} />
        <button type="submit">登入</button>
      </form>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.title}</p>
      </header>
    </div>
  );
}

export default App;
