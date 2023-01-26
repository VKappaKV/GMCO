import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PlaylistList from "../components/PlaylistComponents/PlaylistList";
import PlaylistSearch from "../components/PlaylistComponents/PlaylistSearch";
import Navbar from "../components/UI/Navbar";
import EditingContext from "../components/utility/EditContext";
import PlaylistContext from "../components/utility/PlaylistContext";
import UserContext from "../components/utility/UserContext";

const homepage = () => {
  const { user } = useContext(UserContext);
  const { key } = useContext(EditingContext);
  const { SetPlaylist } = useContext(PlaylistContext);
  const router = useRouter();
  const username = JSON.parse(localStorage.getItem(user)).username;
  const [privp, SetPrivP] = useState([]);
  const [pp, Setpp] = useState([]);
  const [search, onSearch] = useState(false);

  useEffect(() => {
    Setpp(JSON.parse(localStorage.getItem("public playlists")));
    console.log("caricate: ", pp);

    const userObj = JSON.parse(localStorage.getItem(user));
    const prvp = userObj.playlist ? userObj.playlist : null;
    console.log("my playlist are : ", prvp);
    if (prvp) SetPrivP(prvp);
  }, [key]);

  const FilterPlaylist = (filtered_collection) => {
    console.log("callbacked: ", filtered_collection);
    Setpp(filtered_collection);
  };

  const resetPublicPlaylistHandler = () => {
    Setpp(JSON.parse(localStorage.getItem("public playlists")));
  };

  const handleRoutingToNewPlaylist = () => {
    router.push("/" + "newPlaylist");
    SetPlaylist({
      name: "",
      tag: "",
      description: "",
      songs: [],
      author: user,
      id: 0,
    });
  };

  if (!user) {
    return (
      <>
        <button
          onClick={() => {
            router.push("/" + "");
          }}
        >
          BACK TO LOGIN
        </button>
      </>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <h1 style={{ alignSelf: "center" }}> LA TUA HOMEPAGE {username}</h1>
        <button
          className="btn btn-dark"
          style={{ width: "max-content", alignSelf: "center" }}
          onClick={handleRoutingToNewPlaylist}
        >
          CREA NUOVA PLAYLIST
        </button>
        <h3 style={{ alignSelf: "center" }}>LE TUE PLAYLIST</h3>
        <PlaylistList pp={privp} modify={true} />
        <h3 style={{ alignSelf: "center" }}>PLAYLIST PUBBLICHE</h3>{" "}
        <button
          className="btn btn-secondary"
          style={{ width: "max-content", alignSelf: "center" }}
          onClick={() => {
            onSearch((c) => !c);
            resetPublicPlaylistHandler();
          }}
        >
          {" "}
          CERCA PLAYLIST{" "}
        </button>
        {search && (
          <PlaylistSearch
            onSearch={onSearch}
            playlist={pp}
            onFilterPlaylist={FilterPlaylist}
          />
        )}
        <PlaylistList pp={pp} modify={false} pub={true} />
      </div>
    );
  }
};
export default homepage;
