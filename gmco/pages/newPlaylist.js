import { useState } from "react";
import CreatePlaylist from "../components/PlaylistComponents/CreatePlaylist";
import PlaylistItem from "../components/PlaylistComponents/PlaylistItem";
import Navbar from "../components/UI/Navbar";

const newPlaylist = () => {
  const [isCreated, SetisCreated] = useState(false);
  const [getPlaylist, SetPlaylist] = useState();

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
      {isCreated ? <h1>CERCA DELLE CANZONI DA AGGIUNGERE</h1> : null}
    </>
  );
};

export default newPlaylist;

/* <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button type="button" className="btn btn-outline-primary">
          search
        </button>
      </div>*/
