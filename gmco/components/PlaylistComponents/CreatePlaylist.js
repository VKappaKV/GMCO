import { useContext, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";
import UserContext from "../utility/UserContext";

const CreatePlaylist = (props) => {
  const { playlist, SetPlaylist } = useContext(PlaylistContext);
  const { user } = useContext(UserContext);

  const handleSubmit = () => {
    console.log("SUBMITTED");
    console.log(playlist);
    SetPlaylist({ ...playlist, author: user });
    setTimeout(50);
    props.onCreate();
  };

  return (
    <div>
      <input
        id="nome-playlist"
        type="text"
        placeholder="NOME PLAYLIST"
        required
        onChange={(e) => SetPlaylist({ ...playlist, name: e.target.value })}
      />
      <input
        id="tag-playlist"
        type="text"
        placeholder="#TAG"
        required
        onChange={(e) => SetPlaylist({ ...playlist, tag: e.target.value })}
      />
      <br />
      <textarea
        id="descrizione-playlist"
        placeholder="DESCRIZIONE PLAYLIST"
        rows="3"
        cols="30"
        onChange={(e) =>
          SetPlaylist({ ...playlist, description: e.target.value })
        }
      />
      <button onClick={handleSubmit}>ADD PLAYLIST</button>
    </div>
  );
};

export default CreatePlaylist;
