import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import styles from "./Login.module.css";
const Login = () => {
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [isLogin, SetIsLogin] = useState(true);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.text}>BENVENUTO </h1>
        <button
          className={styles.btn}
          onClick={() => {
            deleteHandler();
            SetIsLogin(() => true);
          }}
        >
          ACCEDI
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            deleteHandler();
            SetIsLogin(() => false);
          }}
        >
          REGISTRATI
        </button>
        {ModalIsOpen && (
          <Modal
            onCancel={closeModalHandler}
            onConfirm={closeModalHandler}
            form={isLogin}
          />
        )}
        {ModalIsOpen && <Backdrop onCancel={closeModalHandler} />}
      </div>
    </div>
  );
};

export default Login;
