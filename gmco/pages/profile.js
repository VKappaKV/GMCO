import UserContext from "../components/utility/UserContext";
import styles from "../components/PlaylistComponents/PlaylistModal.module.css";
import { useContext, useState } from "react";
import Navbar from "../components/UI/Navbar";
import { useRouter } from "next/router";
import Backdrop from "../components/LoginComponents/Backdrop";

const profile = () => {
  const { user } = useContext(UserContext);
  const username = JSON.parse(localStorage.getItem(user)).username;
  const router = useRouter();
  const [toEdit, SetToEdit] = useState();
  const [modal, onModalChange] = useState(false);

  function deleteHandler() {
    onModalChange(true);
  }

  function closeModalHandler() {
    onModalChange(false);
  }

  function removeAllUserPlaylist() {
    const getplaylists = JSON.parse(localStorage.getItem("public playlists"));
    console.log(getplaylists);
    const filteredPlaylist = getplaylists.filter((i) => i.author !== user);
    console.log(filteredPlaylist);
    localStorage.setItem("public playlists", JSON.stringify(filteredPlaylist));
  }

  return (
    <>
      <Navbar />
      <h1>This is your Profile Page {username}</h1>
      <div className="list-group">
        <button
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => {
            SetToEdit("username");
            deleteHandler();
          }}
        >
          CHANGE USERNAME
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => {
            SetToEdit("password");
            deleteHandler();
          }}
        >
          UPDATE PASSWORD
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => {
            router.push("/" + "preferences");
          }}
        >
          SET YOUR PREFERENCES
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          style={{ color: "red" }}
          onClick={() => {
            removeAllUserPlaylist();
            localStorage.removeItem(user);
            router.push("/");
          }}
        >
          DELETE USER
        </button>
      </div>
      {modal && <ModalProfile edit={toEdit} closeModal={closeModalHandler} />}
      {modal && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
};
export default profile;

const ModalProfile = ({ edit, closeModal }) => {
  const [edited, SetEdited] = useState();
  const { user } = useContext(UserContext);

  function handleValueUpdate() {
    const profile = JSON.parse(localStorage.getItem(user));
    switch (edit) {
      case "username": {
        profile.username = edited;
        localStorage.setItem(user, JSON.stringify(profile));
        break;
      }
      case "password": {
        profile.password = edited;
        localStorage.setItem(user, JSON.stringify(profile));
        break;
      }
    }
    closeModal();
  }

  return (
    <div className={styles.modal}>
      <h5>modifica: {edit}</h5>
      <input
        id="edited"
        type="text"
        placeholder={edit}
        required
        onChange={(e) => SetEdited(e.target.value)}
      />
      <button onClick={handleValueUpdate}> INVIA </button>
    </div>
  );
};
