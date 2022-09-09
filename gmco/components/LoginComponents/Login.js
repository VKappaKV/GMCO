import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

const Login = () => {
  const [ModalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <h1>Qui fai la form </h1>
      <button onClick={deleteHandler}>Login</button>
      {ModalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
      )}
      {ModalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </div>
  );
};

export default Login;
