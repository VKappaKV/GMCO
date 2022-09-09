import styles from "./Modal.module.css";

// informazioni quali nome utente, indirizzo email, password,
//preferenze musicali, gruppi preferiti.

function Modal(props) {
  function CancelHandler() {
    props.onCancel();
  }

  function ConfirmHandler() {
    props.onConfirm();
  }

  return (
    <div className={styles.modal}>
      <form>
        <label htmlFor="nome">Nome: </label>
        <input type="text" required id="nome" />
        <br />
        <label htmlFor="email">email: </label>
        <input type="text" required id="email" />
        <p>Are you sure?</p>
        <button className={styles.btnalt} onClick={ConfirmHandler}>
          Confirm
        </button>
        <button className={styles.btn} onClick={CancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Modal;
