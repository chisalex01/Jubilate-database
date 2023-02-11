import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending] = useState(false);
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const { data: users } = useFetch("http://localhost:8000/users/");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  let found = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    function isValidEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    }

    function isValidName(username) {
      return /^[a-zA-Z]{3,40}( [a-zA-Z]{3,40})+$/.test(username);
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        setEmailMessage("*un utilizator este deja înregistrat cu acest email");
        found = true;
        break;
      }
    }
    if (!username) setUsernameMessage("*spațiu necompletat");
    else if (!isValidName(username))
      setUsernameMessage("*formatul numelui este incorect");
    else setUsernameMessage("");
    if (!email) setEmailMessage("*spațiu necompletat");
    else if (!isValidEmail(email)) {
      setEmailMessage("*formatul email-ului este incorect");
    } else {
      setEmailMessage("");
    }
    if (!password) setPasswordMessage("*spațiu necompletat");
    else if (password.length < 8)
      setPasswordMessage("*formatul parolei este incorect");
    else setPasswordMessage("");

    if (found === false && username && email && password)
      axios
        .post("http://localhost:8000/users/", {
          username: username,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.status);
          history.push("/home");
        });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="base-container">
      <div className="content">
        <div className="image">
          <img src={require("./Logo.png")} alt="register" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nume complet</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              placeholder="ex: Nume Prenume"
            />
            <p className="error">{usernameMessage}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              placeholder="ex: email@gmail.com"
            />
            <p className="error">{emailMessage}</p>
          </div>
          <div className="form-group">
            <label>Parolă</label>
            <input
              type={passwordShown ? "text" : "password"}
              value={password}
              placeholder="ex: parolă123 (minim 8 caractere)"
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

          {!isPending && <button className="btn">Înregistrare</button>}
          {isPending && <button disabled>Adăugare utilizator...</button>}
        </form>
      </div>
    </div>
  );
};

export default Register;
