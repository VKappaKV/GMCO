import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserContext from "../utility/UserContext";
import styles from "./Modal.module.css";

// informazioni quali nome utente, indirizzo email, password,

function Modal(props) {
  //Variabili target per registrarsi
  const [email_signup, SetEmailSignup] = useState();
  const [password_signup, SetPasswordSignup] = useState();
  const [username_signup, SetUsernameSignup] = useState();
  //Variabili target per accedere
  const [email_login, SetEmailLogin] = useState();
  const [password_login, SetPasswordLogin] = useState();
  // Router per link alla pagina successiva
  const router = useRouter();
  // SetUserContext per attivare l'utente loggato
  const { user, setUser } = useContext(UserContext);

  function CancelHandler() {
    props.onCancel();
  }

  function ConfirmHandler() {
    props.onConfirm();
    console.log(user);
    const getUsername = JSON.parse(localStorage.getItem(email_login));
    console.log(getUsername.username);
    setUser(email_login);
    router.push("/" + "homepage");
  }

  function ConfirmSignupHandler() {
    props.onConfirm();
    setUser(email_signup);
    router.push("/" + "preferences");
  }

  function SignupHandler() {
    let user = {};
    user.email = email_signup;
    user.password = password_signup;
    user.username = username_signup;
    const key = email_signup;
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(user));
    }

    alert(`Utente ${user.username} Registrato con email: ${key}`);
    console.log(user, "stored user");
    var userStored = JSON.parse(localStorage.getItem(key));
    console.log(userStored, "retrieved user");
    ConfirmSignupHandler();
  }

  const LoginHandler = (e) => {
    e.preventDefault();
    console.log(
      `Devo accedere con ${email_login} e password ${password_login}`
    );
    const logging_user = JSON.parse(localStorage.getItem(email_login));
    console.log(logging_user);
    if (logging_user == null) {
      alert("user is not registered");
      CancelHandler();
    } else if (password_login != logging_user.password) {
      console.log(password_login + "is not the correct password");
      CancelHandler();
    } else {
      alert("Bentornato " + logging_user.username);
      ConfirmHandler();
    }
  };

  if (props.form === true) {
    return (
      <div className={styles.modal}>
        <form onSubmit={LoginHandler}>
          <h3>ACCEDI</h3>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              required
              onChange={(e) => {
                SetEmailLogin(e.target.value);
              }}
            />
            <label htmlFor="floatingEmail">Indirizzo email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              onChange={(e) => {
                SetPasswordLogin(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className={styles.btnalt}>
            Confirm
          </button>
          <button className={styles.btn} onClick={CancelHandler} type="button">
            Cancel
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.modal}>
        <form onSubmit={SignupHandler}>
          <h1>REGISTRATI</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              onChange={(e) => SetEmailSignup(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Indirizzo email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(e) => SetUsernameSignup(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Nome Utente</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => SetPasswordSignup(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" className={styles.btnalt}>
            Confirm
          </button>
          <button type="button" className={styles.btn} onClick={CancelHandler}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default Modal;
