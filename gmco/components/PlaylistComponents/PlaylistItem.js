import { useContext, useEffect, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";
import Backdrop from "../LoginComponents/Backdrop";
import { useRouter } from "next/router";
import styles from "./PlaylistItem.module.css";
import UserContext from "../utility/UserContext";
import EditingContext from "../utility/EditContext";
import Image from "next/image";

const PlaylistItem = ({ playlist, editable, pub }) => {
  const [showEditButton, SetShowEditButton] = useState(false);
  const [showInfo, SetShowInfo] = useState(false);
  const [trackToShow, SetTrackToShow] = useState();
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

  function ShowInfoHandler() {
    SetShowInfo(true);
  }

  function closeInfoHandler() {
    SetShowInfo(false);
  }

  function deletePlaylistHandler() {
    const selected_user = JSON.parse(localStorage.getItem(user));
    const index = selected_user.playlist.findIndex((i) => i.id === playlist.id);
    selected_user.playlist.splice(index, 1);
    localStorage.setItem(user, JSON.stringify(selected_user));
    SetKey(++key);
    console.log(
      "autore?",
      playlist.author,
      "io: ",
      user,
      "uguali? ",
      playlist.author === user
    );
    if (user !== playlist.author) return;
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

  const addPlaylistToUserCollection = () => {
    if (user == playlist.author) {
      alert("Playlist already collected, you are the owner");
      return;
    }
    const selected_user = JSON.parse(localStorage.getItem(user));
    if (!selected_user.playlist) selected_user.playlist = [];
    if (selected_user.playlist.find((i) => i.id == playlist.id)) {
      alert("you already have this playlist in your collection");
      return;
    }
    selected_user.playlist.push(playlist);
    localStorage.setItem(user, JSON.stringify(selected_user));
    SetKey(++key);
  };

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
      <div>
        TAG: #{playlist.tag} <br /> description: {playlist.description} <br />{" "}
        songs:{" "}
        <ul>
          {playlist.songs.map((track) => (
            <li
              className={styles.clickable}
              key={track.id}
              onClick={() => {
                SetTrackToShow(track);
                ShowInfoHandler();
              }}
            >
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
            className="btn btn-outline-dark"
            onClick={() => {
              SetPlaylist(playlist);
              deleteHandler();
            }}
          >
            {" "}
            EDIT{" "}
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              SetPlaylist(playlist);
              router.push("/" + "newPlaylist");
            }}
          >
            Add Songs
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              deletePlaylistHandler();
            }}
          >
            DELETE
          </button>
        </div>
      )}
      {pub && (
        <button
          className="btn btn-outline-success"
          onClick={addPlaylistToUserCollection}
        >
          AGGIUNGI ALLE TUE PLAYLIST
        </button>
      )}
      {modal && (
        <EditPlaylist closeModal={closeModalHandler} playlist={playlist} />
      )}
      {modal && <Backdrop onCancel={closeModalHandler} />}
      {showInfo && <TrackInfo track={trackToShow} />}
      {showInfo && <Backdrop onCancel={closeInfoHandler} />}
    </div>
  );
};

export default PlaylistItem;

const TrackInfo = ({ track }) => {
  useEffect(() => {
    console.log("DISPLAYING: ", track);

    return () => {
      console.log("track close");
    };
  }, []);

  function msToHMS(ms) {
    console.log(ms);
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    const hms = minutes + ":" + Math.floor(seconds);
    return hms;
  }

  return (
    <div className={styles.modal}>
      <Image src={track.album.images[0].url} width={640} height={640} />
      <h5>
        {track.artists?.map((artist) => {
          const names = artist.name + " ";
          return names;
        })}{" "}
        : {track.name}
      </h5>
      <div>
        <p>
          ALBUM: <b>{track.album.name}</b> <br />
          DATE: {track.album.release_date} <br />
          DURATION: {msToHMS(track.duration_ms)}
        </p>
      </div>
    </div>
  );
};

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
    if (playlist.author !== user) {
      closeModal();
      SetKey((k) => k + 1);
      return;
    }
    const public_playlists = JSON.parse(
      localStorage.getItem("public playlists")
    );
    const public_index = public_playlists.findIndex((i) => i.id == playlist.id);
    if (public_index == -1) {
      closeModal();
      return;
    }
    public_playlists.splice(public_index, 1);
    public_playlists.push(before);
    localStorage.setItem("public playlists", JSON.stringify(public_playlists));

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
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={styles.modalEdit}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            style={{ minHeight: "10px", height: "30px", maxHeight: "50px" }}
            id="nome-playlist"
            type="text"
            placeholder={playlist.name}
            required
            onChange={(e) => SetBefore({ ...before, name: e.target.value })}
          />
          <input
            style={{ minHeight: "10px", height: "30px", maxHeight: "50px" }}
            id="tag-playlist"
            type="text"
            placeholder={playlist.tag}
            required
            onChange={(e) => SetBefore({ ...before, tag: e.target.value })}
          />
        </div>

        <textarea
          style={{
            minHeight: "10px",
            height: "100px",
            maxHeight: "100px",
          }}
          id="descrizione-playlist"
          placeholder={playlist.description}
          rows="3"
          cols="30"
          onChange={(e) =>
            SetBefore({ ...before, description: e.target.value })
          }
        />
      </div>
      {before && (
        <ul>
          {before.songs?.map((track) => (
            <li
              className={styles.clickable}
              key={track.id}
              onClick={() => deleteTrack(track)}
            >
              {track.artists?.map((artist) => {
                const names = artist.name + " ";
                return names;
              })}
              : {track.name}
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: "flex", alignSelf: "center" }}>
        <button
          className="btn btn-outline-success"
          style={{ width: "max-content" }}
          onClick={handleConfirm}
        >
          {" "}
          CONFERMA MODIFICHE{" "}
        </button>
        <button
          className="btn btn-outline-danger"
          style={{ width: "max-content" }}
          onClick={() => closeModal()}
        >
          Annulla
        </button>
      </div>
    </div>
  );
};

export { EditPlaylist };
