import styles from "./PlaylistModal.module.css";
import { useContext, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";
import { useRouter } from "next/router";
import UserContext from "../utility/UserContext";

const PlaylistModal = (props) => {
  const { user } = useContext(UserContext);
  const [selectedOption, onSelect] = useState();
  const { playlist, SetPlaylist } = useContext(PlaylistContext);
  const router = useRouter();

  const AddPublicPlaylist = () => {
    const pp = JSON.parse(localStorage.getItem("public playlists") || "[]");
    pp.push(playlist);
    localStorage.setItem("public playlists", JSON.stringify(pp));

    AddPlaylistToProfile();
  };

  const AddPlaylistToProfile = () => {
    const us = JSON.parse(localStorage.getItem(user));
    if ("playlist" in us) {
      us.playlist.push(playlist);
      console.log("ESISTE: ", us);
    } else {
      us.playlist = [];
      us.playlist.push(playlist);
      console.log("NON ESISTE: ", us);
    }
    localStorage.setItem(user, JSON.stringify(us));
  };

  const handleConfirm = () => {
    props.closeModal();
    switch (selectedOption) {
      case "pubblica":
        console.log("creo playlist pubblica");
        console.log(playlist);
        AddPublicPlaylist();
        SetPlaylist({
          name: "",
          tag: "",
          description: "",
          songs: [],
          author: user,
        });
        router.push("/homepage");
        break;
      case "privata":
        console.log("creo playlist privata");
        console.log(playlist);
        AddPlaylistToProfile();
        SetPlaylist({
          name: "",
          tag: "",
          description: "",
          songs: [],
          author: user,
        });
        router.push("/homepage");
        break;
      default:
        console.log("non hai selezionato correttamente");
    }
  };

  return (
    <div className={styles.modal}>
      <form>
        <input
          type="radio"
          id="public"
          name="playlist"
          value="public"
          onChange={() => onSelect("pubblica")}
        />
        PUBLIC
        <br />
        <input
          type="radio"
          id="private"
          name="playlist"
          value="private"
          onChange={() => onSelect("privata")}
        />{" "}
        PRIVATE
        <br />
      </form>
      <div>
        <button onClick={handleConfirm}>
          Conferma Creazione Playlist {selectedOption}
        </button>
        <button onClick={() => props.closeModal()}>Annulla</button>
      </div>
    </div>
  );
};

export default PlaylistModal;
