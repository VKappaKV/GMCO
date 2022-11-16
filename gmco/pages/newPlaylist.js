import { useState } from "react";
import CreatePlaylist from "../components/PlaylistComponents/CreatePlaylist";
import PlaylistItem from "../components/PlaylistComponents/PlaylistItem";
import TrackSearch from "../components/PlaylistComponents/TrackSearch";
import { TracksList } from "../components/PlaylistComponents/TracksList";
import Navbar from "../components/UI/Navbar";

const newPlaylist = () => {
  const [isCreated, SetisCreated] = useState(false);
  const [getPlaylist, SetPlaylist] = useState();
  const [willSearch, SetwillSearch] = useState(true);
  const [searchObj, SetsearchObj] = useState();

  const handleCreation = (playlist) => {
    SetPlaylist(playlist);
    SetisCreated(true);
  };
  return (
    <>
      <Navbar />
      <h1>CREA QUI LA TUA PLAYLIST</h1>
      {isCreated ? (
        <div>
          <h4> HO CREATO LA PLAYLIST</h4>
          <button onClick={() => SetisCreated(false)}>
            {" "}
            REIMPOSTA LA PLAYLIST
          </button>
          <PlaylistItem item={getPlaylist} />
        </div>
      ) : (
        <CreatePlaylist onCreate={handleCreation} />
      )}
      {isCreated ? (
        willSearch ? (
          <TrackSearch onSearch={SetwillSearch} handleObj={SetsearchObj} />
        ) : (
          <TracksList onSearch={SetwillSearch} objData={searchObj} />
        )
      ) : null}
    </>
  );
};

export default newPlaylist;
