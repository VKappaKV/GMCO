import { useContext, useEffect, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";
import Backdrop from "../LoginComponents/Backdrop";
import { useRouter } from "next/router";
import styles from "./PlaylistItem.module.css";
import UserContext from "../utility/UserContext";
import EditingContext from "../utility/EditContext";

const PlaylistItem = ({ playlist, editable }) => {
  const [showEditButton, SetShowEditButton] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { SetPlaylist } = useContext(PlaylistContext);
  const [modal, SetModal] = useState(false);
  const { key, SetKey } = useContext(EditingContext);

  function deleteHandler() {
    SetModal(true);
  }

  function closeModalHandler() {
    SetModal(false);
  }

  function deletePlaylistHandler() {
    const selected_user = JSON.parse(localStorage.getItem(user));
    const index = selected_user.playlist.findIndex((i) => i.id === playlist.id);
    selected_user.playlist.splice(index, 1);
    localStorage.setItem(user, JSON.stringify(selected_user));
    SetKey(++key);
    const public_playlists = JSON.parse(
      localStorage.getItem("public playlists" || null)
    );
    if (!public_playlists) return;
    const index_public = public_playlists.findIndex(
      (i) => i.id === playlist.id
    );
    console.log("indice ", index_public);
    if (index_public === -1) return;
    public_playlists.splice(index_public, 1);
    SetKey(++key);
    localStorage.setItem("public playlists", JSON.stringify(public_playlists));
  }

  useEffect(() => {
    console.log("la playlist appare così: ", playlist);
    if (editable) SetShowEditButton(true);
  }, [playlist]);
  useEffect(() => {
    console.log("rendering numero: ", key);
  }, [key]);

  return (
    <div>
      <h3>{playlist.name}</h3>
      <h6>{playlist.author}</h6>
      <p>{playlist.id}</p>
      <div>
        TAG: #{playlist.tag} <br /> description: {playlist.description} <br />{" "}
        songs:{" "}
        <ul>
          {playlist.songs.map((track) => (
            <li key={track.id}>
              {track.name} :{" "}
              {track.artists?.map((artist) => {
                const names = artist.name + " ";
                return names;
              })}
            </li>
          ))}
        </ul>
      </div>
      {showEditButton && (
        <div>
          <button
            onClick={() => {
              SetPlaylist(playlist);
              SetModal(true);
            }}
          >
            {" "}
            EDIT{" "}
          </button>
          <button
            onClick={() => {
              SetPlaylist(playlist);
              router.push("/" + "newPlaylist");
            }}
          >
            Add Songs
          </button>
          <button
            onClick={() => {
              deletePlaylistHandler();
            }}
          >
            DELETE
          </button>
        </div>
      )}
      {modal && (
        <EditPlaylist closeModal={closeModalHandler} playlist={playlist} />
      )}
      {modal && <Backdrop onCancel={closeModalHandler} />}
    </div>
  );
};

export default PlaylistItem;

const EditPlaylist = ({ closeModal, playlist }) => {
  const { user } = useContext(UserContext);
  const { key, SetKey } = useContext(EditingContext);
  const [before, SetBefore] = useState();

  const handleConfirm = () => {
    const selected_user = JSON.parse(localStorage.getItem(user));
    const userPlaylists = selected_user.playlist;
    const index = userPlaylists.findIndex((i) => i.id == playlist.id);
    if (index == -1) {
      closeModal();
      return;
    }
    userPlaylists.splice(index, 1);
    console.log("senza la playlist scelta", userPlaylists);
    console.log(before);
    userPlaylists.push(before);
    console.log(selected_user);
    localStorage.setItem(user, JSON.stringify(selected_user));
    console.log("sono qui al render numero: ", key);
    SetKey((k) => k + 1);
    closeModal();
  };

  function deleteTrack(track) {
    console.log("cancello: ", track);
    const cleanedPlaylist = before.songs.filter((i) => i !== track);
    SetBefore({ ...before, songs: cleanedPlaylist });
  }

  useEffect(() => {
    const anotherbefore = playlist;
    SetBefore(anotherbefore);
    console.log(before);
  }, []);

  return (
    <div className={styles.modalEdit}>
      <input
        id="nome-playlist"
        type="text"
        placeholder={playlist.name}
        required
        onChange={(e) => SetBefore({ ...before, name: e.target.value })}
      />
      <input
        id="tag-playlist"
        type="text"
        placeholder={playlist.tag}
        required
        onChange={(e) => SetBefore({ ...before, tag: e.target.value })}
      />
      <br />
      <textarea
        id="descrizione-playlist"
        placeholder={playlist.description}
        rows="3"
        cols="30"
        onChange={(e) => SetBefore({ ...before, description: e.target.value })}
      />
      {before && (
        <ul>
          {before.songs?.map((track) => (
            <li key={track.id} onClick={() => deleteTrack(track)}>
              {track.artists?.map((artist) => {
                const names = artist.name + " ";
                return names;
              })}
              : {track.name}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleConfirm}> CONFERMA MODIFICHE </button>
      <button onClick={() => closeModal()}>Annulla</button>
    </div>
  );
};

export { EditPlaylist };
