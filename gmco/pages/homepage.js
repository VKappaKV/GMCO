import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PlaylistList from "../components/PlaylistComponents/PlaylistList";
import Navbar from "../components/UI/Navbar";
import PlaylistContext from "../components/utility/PlaylistContext";
import UserContext from "../components/utility/UserContext";

const homepage = () => {
  const { user } = useContext(UserContext);
  const { SetPlaylist } = useContext(PlaylistContext);
  const router = useRouter();
  const username = JSON.parse(localStorage.getItem(user)).username;
  const [privp, SetPrivP] = useState([]);
  const [pp, Setpp] = useState([]);
  const [dodo, SetonDD] = useState(false);

  useEffect(() => {
    pp.push(JSON.parse(localStorage.getItem("public playlists")));
    console.log("caricate: ", pp);
    SetonDD(!dodo);

    if (pp !== null) {
      try {
        pp[0]?.map((i) => console.log(i, i.author, typeof i, typeof pp));
      } catch (error) {
        console.log(error);
      }
    }
    const userObj = JSON.parse(localStorage.getItem(user));
    const prvp = userObj.playlist ? userObj.playlist : null;
    console.log("my playlist are : ", prvp);
    if (prvp) SetPrivP(prvp);
  }, []);

  const handleRoutingToNewPlaylist = () => {
    router.push("/" + "newPlaylist");
    SetPlaylist({
      name: "",
      tag: "",
      description: "",
      songs: [],
      author: user,
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
      <>
        <Navbar />
        <h1> THIS IS THE HOMEPAGE </h1>
        <p>BEN ARRIVATO {username}</p>
        <button onClick={handleRoutingToNewPlaylist}>
          CREA NUOVA PLAYLIST
        </button>
        <h3>LE TUE PLAYLIST</h3>
        <PlaylistList pp={privp} modify={true} />
        <h3>PLAYLIST PUBBLICHE</h3>
        <PlaylistList pp={pp[0]} modify={false} />
      </>
    );
  }
};
export default homepage;
