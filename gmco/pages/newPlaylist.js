import { useContext, useEffect, useState } from "react";
import Backdrop from "../components/LoginComponents/Backdrop";
import CreatePlaylist from "../components/PlaylistComponents/CreatePlaylist";
import PlaylistItem from "../components/PlaylistComponents/PlaylistItem";
import TrackSearch from "../components/PlaylistComponents/TrackSearch";
import { TracksList } from "../components/PlaylistComponents/TracksList";
import Navbar from "../components/UI/Navbar";
import PlaylistContext from "../components/utility/PlaylistContext";
import PlaylistModal from "../components/PlaylistComponents/PlaylistModal";
import UserContext from "../components/utility/UserContext";
import { useRouter } from "next/router";

const newPlaylist = () => {
  const { user } = useContext(UserContext);
  const rt = useRouter();
  const { playlist, SetPlaylist } = useContext(PlaylistContext);
  const [modal, onModalChange] = useState(false);
  const [isCreated, SetisCreated] = useState(false);
  const [willSearch, SetwillSearch] = useState(true);
  const [searchObj, SetsearchObj] = useState();

  function deleteHandler() {
    console.log("PLAYLIST IN QUESTO MOMENTO: ", playlist);
    const check_user = JSON.parse(localStorage.getItem(user));
    const check_public_playlists = JSON.parse(
      localStorage.getItem("public playlists")
    );
    if (check_user.playlist) {
      const foundItem = check_user.playlist.find(
        (item) => item.id === playlist.id
      );
      console.log("l'ho trovato ", foundItem);
      if (foundItem) {
        const filtered = check_user.playlist.filter(
          (i) => i.id !== playlist.id
        );
        check_user.playlist = filtered;
        console.log(check_user);
        console.log("aggiungo la playlist modificata", playlist);
        check_user.playlist.push(playlist);
        localStorage.setItem(user, JSON.stringify(check_user));
        if (check_public_playlists) {
          const foundItem = check_public_playlists.find(
            (item) => item.id === playlist.id && item.author === user
          );
          const res = foundItem
            ? "l'ho trovato"
            : "non è nelle playlist pubbliche";
          console.log(res, " ", foundItem);
          if (!foundItem) {
            rt.push("/homepage");
            return;
          }
          const filtered_pp = check_public_playlists.filter(
            (i) => i.id !== playlist.id
          );
          console.log(
            "rimuovo la playlist dalla lista che poi devo aggiornare: ",
            filtered_pp
          );
          check_public_playlists = filtered_pp;
          check_public_playlists.push(playlist);
          localStorage.setItem(
            "public playlists",
            JSON.stringify(check_public_playlists)
          );
        }
        rt.push("/homepage");
      }
    }
    onModalChange(true);
  }

  function closeModalHandler() {
    onModalChange(false);
  }

  const handleCreation = () => {
    console.log("ON CREATION: ", playlist);
    SetisCreated(true);
  };

  const handlePlaylistReset = () => {
    SetisCreated(false);
    SetPlaylist({
      name: "",
      tag: "",
      description: "",
      songs: [],
      author: user,
      id: 0,
    });
  };

  const isEmpty = (obj) => {
    if (!obj.name && !obj.tag && !obj.description && !obj.songs.lenght)
      return true;
    else return false;
  };

  useEffect(() => {
    console.log(playlist);
    if (!isEmpty(playlist)) SetisCreated(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className={{ flexDirection: "row" }}>
        <h1>CREA QUI LA TUA PLAYLIST</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={deleteHandler}
        >
          COMPLETA
        </button>
      </div>
      {isCreated ? (
        <div>
          <h4> HO CREATO LA PLAYLIST</h4>
          <button onClick={handlePlaylistReset}> REIMPOSTA LA PLAYLIST</button>
          <PlaylistItem playlist={playlist} />
        </div>
      ) : (
        <CreatePlaylist onCreate={handleCreation} addedSongs={playlist} />
      )}
      {isCreated ? (
        willSearch ? (
          <TrackSearch onSearch={SetwillSearch} handleObj={SetsearchObj} />
        ) : (
          <TracksList onSearch={SetwillSearch} objData={searchObj} />
        )
      ) : null}
      {modal && <PlaylistModal closeModal={closeModalHandler} />}
      {modal && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
};

export default newPlaylist;
