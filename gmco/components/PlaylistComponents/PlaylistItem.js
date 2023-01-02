import { useContext, useEffect, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";
import Backdrop from "../LoginComponents/Backdrop";
import { useRouter } from "next/router";
import styles from "./PlaylistItem.module.css";

const PlaylistItem = ({ playlist, editable }) => {
  const [showEditButton, SetShowEditButton] = useState(false);
  const router = useRouter();
  const { SetPlaylist } = useContext(PlaylistContext);
  const [modal, SetModal] = useState(false);

  function deleteHandler() {
    SetModal(true);
  }

  function closeModalHandler() {
    SetModal(false);
  }

  useEffect(() => {
    console.log("la playlist appare così: ", playlist);
    if (editable) SetShowEditButton(true);
  }, [playlist]);

  return (
    <div>
      <h3>{playlist.name}</h3>
      <h6>{playlist.author}</h6>
      <div>
        TAG: #{playlist.tag} <br /> description: {playlist.description} <br />{" "}
        songs:{" "}
        <ul>
          {playlist.songs.map((track) => (
            <li key={track.id}>
              {track.name} by:{" "}
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
        </div>
      )}
      {modal && <EditPlaylist closeModal={closeModalHandler} />}
      {modal && <Backdrop onCancel={closeModalHandler} />}
    </div>
  );
};

export default PlaylistItem;

const EditPlaylist = ({ closeModal }) => {
  const { playlist, SetPlaylist } = useContext(PlaylistContext);
  const [before, SetBefore] = useState();

  const handleConfirm = () => {
    const bfPl = JSON.parse(localStorage.getItem(user)).playlist;
    console.log(bfPl);
    bfPl.pop(before);
    closeModal();
  };

  function deleteTrack(track) {
    console.log("cancello: ", track);
    before.songs.pop(track);
  }

  useEffect(() => {
    SetBefore(playlist);
    console.log(before);
  }, []);

  return (
    <div className={styles.modalEdit}>
      <input
        id="nome-playlist"
        type="text"
        value={playlist.name}
        required
        onChange={(e) => SetPlaylist({ ...playlist, name: e.target.value })}
      />
      <input
        id="tag-playlist"
        type="text"
        value={playlist.tag}
        required
        onChange={(e) => SetPlaylist({ ...playlist, tag: e.target.value })}
      />
      <br />
      <textarea
        id="descrizione-playlist"
        value={playlist.description}
        rows="3"
        cols="30"
        onChange={(e) =>
          SetPlaylist({ ...playlist, description: e.target.value })
        }
      />
      <ul>
        {playlist.songs.map((track) => (
          <li key={track.id} onClick={() => deleteTrack(track)}>
            {track.artists?.map((artist) => {
              const names = artist.name + " ";
              return names;
            })}
            : {track.name}
          </li>
        ))}
      </ul>
      <button onClick={handleConfirm}> CONFERMA MODIFICHE </button>
      <button onClick={() => closeModal()}>Annulla</button>
    </div>
  );
};

export { EditPlaylist };
