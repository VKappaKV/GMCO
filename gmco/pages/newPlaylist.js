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

const newPlaylist = () => {
  const { user } = useContext(UserContext);
  const [modal, onModalChange] = useState(false);
  const [isCreated, SetisCreated] = useState(false);
  const { playlist, SetPlaylist } = useContext(PlaylistContext);
  const [willSearch, SetwillSearch] = useState(true);
  const [searchObj, SetsearchObj] = useState();

  function deleteHandler() {
    onModalChange(true);
  }

  function closeModalHandler() {
    onModalChange(false);
  }

  const handleCreation = () => {
    console.log("ON CREATION: ", playlist);
    SetisCreated(true);
  };
  const AddSongsToPlaylist = (songs) => {
    SetPlaylist((playlist) => ({ ...playlist, [playlist.songs]: songs }));
    console.log("UPDATING PLAYLIST TO: ", playlist);
  };

  const handlePlaylistReset = () => {
    SetisCreated(false);
    SetPlaylist({
      name: "",
      tag: "",
      description: "",
      songs: [],
      author: user,
    });
  };
  useEffect(() => {
    SetPlaylist({
      name: "",
      tag: "",
      description: "",
      songs: [],
      author: user,
    });
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
          <TracksList
            onSearch={SetwillSearch}
            objData={searchObj}
            addSongs={AddSongsToPlaylist}
          />
        )
      ) : null}
      {modal && <PlaylistModal closeModal={closeModalHandler} />}
      {modal && <Backdrop onCancel={closeModalHandler} />}
    </>
  );
};

export default newPlaylist;
