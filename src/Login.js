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
    let isUserFound = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        isUserFound = true;
        break;
      }
    }

    if (isUserFound) {
      history.push("/songs");
    } else {
      if (!email) {
        setEmailMessage("*spațiu necompletat");
      } else if (emailExists(email)) {
        setEmailMessage("");
      } else {
        setEmailMessage("*cont inexistent");
      }

      if (!password) {
        setPasswordMessage("*spațiu necompletat");
      } else {
        setPasswordMessage("*parolă incorectă");
      }
    }
  };

  const emailExists = (email) => {
    return users.some((user) => user.email === email);
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
            />
            <p className="error">{emailMessage}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password">Parolă</label>
            <input
              type={passwordShown ? "text" : "password"}
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
