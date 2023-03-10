import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPending] = useState(false);
  const history = useHistory();
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const { data: users } = useFetch("http://localhost:8000/users/");

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < users.length; i++)
      if (users[i].email === email && users[i].password === password) {
        history.push("/home");
      } else {
        if (users[i].email !== email && email) {
          setEmailMessage("*cont inexistent");
        }
        if (!email) {
          setEmailMessage("*spațiu necompletat");
        }
        if (users[i].email == email && users[i].password != password) {
          setPasswordMessage("*parolă incorectă");
          setEmailMessage("");
        } else if (
          (!password && !email) ||
          (!password && users[i].email === email)
        ) {
          setPasswordMessage("*spațiu necompletat");
        } else {
          setPasswordMessage("");
        }
      }
  };

  return (
    <div className="base-container">
      <div className="content">
        <div className="image">
          <img src={require("./Logo.png")} alt="login" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              autoComplete="off"
              placeholder="email"
            />
            <p className="error">{emailMessage}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password">Parolă</label>
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="error">{passwordMessage}</p>
            <div className="checkbox">
              <input
                type={"checkbox"}
                onClick={togglePassword}
                className="check"
              ></input>
              <p>Arată parola</p>
            </div>
          </div>
          {!isPending && <button className="btn">Autentificare</button>}
          {isPending && <button disabled>Adăugare cântare...</button>}
        </form>
      </div>
    </div>
  );
};

export default Login;
