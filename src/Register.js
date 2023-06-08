import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending] = useState(false);
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const { data: users } = useFetch("http://localhost:8000/users/");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    function isValidEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    }

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setEmailMessage("*acest email este înregistrat deja");
      return; // Oprire executie daca utilizatorul exista
    } else {
      setEmailMessage("");
    }

    if (!email) setEmailMessage("*spațiu necompletat");
    else if (!isValidEmail(email)) {
      setEmailMessage("*formatul email-ului este incorect");
    } else {
      setEmailMessage("");
    }
    if (!password) setPasswordMessage("*spațiu necompletat");
    else if (password.length < 8 || password.length > 40)
      setPasswordMessage("*formatul parolei este incorect");
    else setPasswordMessage("");

    if (email && password && isValidEmail(email) && password.length >= 8) {
      axios
        .post("http://localhost:8000/users/", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.status);
          history.push("/songs");
        });
    }
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
              />
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
