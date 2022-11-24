import { useContext, useEffect, useState } from "react";
import CreatePlaylist from "../components/PlaylistComponents/CreatePlaylist";
import PlaylistItem from "../components/PlaylistComponents/PlaylistItem";
import TrackSearch from "../components/PlaylistComponents/TrackSearch";
import { TracksList } from "../components/PlaylistComponents/TracksList";
import Navbar from "../components/UI/Navbar";
import PlaylistContext from "../components/utility/PlaylistContext";

const newPlaylist = () => {
  const [isCreated, SetisCreated] = useState(false);
  const { playlist, SetPlaylist } = useContext(PlaylistContext);
  const [willSearch, SetwillSearch] = useState(true);
  const [searchObj, SetsearchObj] = useState();

  const handleCreation = () => {
    console.log("ON CREATION: ", playlist);
    SetisCreated(true);
  };
  const AddSongsToPlaylist = (songs) => {
    SetPlaylist((playlist) => ({ ...playlist, [playlist.songs]: songs }));
    console.log("UPDATING PLAYLIST TO: ", playlist);
  };

  useEffect(() => {
    SetPlaylist({
      name: "",
      tag: "",
      description: "",
      songs: [],
    });
  }, []);

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
          <PlaylistItem item={playlist} />
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
    </>
  );
};

export default newPlaylist;
