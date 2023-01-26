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
    const count_all_playlists = JSON.parse(
      localStorage.getItem("playlistCounter") || 0
    );
    const count = count_all_playlists + 1;
    SetPlaylist({ ...playlist, id: count });
    setTimeout(50);
    props.onCreate();
  };

  return (
    <div style={{ alignSelf: "center", justifySelf: "auto" }}>
      <input
        className="form-control"
        id="nome-playlist"
        type="text"
        placeholder="NOME PLAYLIST"
        required
        onChange={(e) => SetPlaylist({ ...playlist, name: e.target.value })}
      />
      <input
        className="form-control"
        id="tag-playlist"
        type="text"
        placeholder="#TAG"
        required
        onChange={(e) => SetPlaylist({ ...playlist, tag: e.target.value })}
      />
      <br />
      <textarea
        className="input-group-text"
        id="descrizione-playlist"
        placeholder="DESCRIZIONE PLAYLIST"
        rows="3"
        cols="30"
        onChange={(e) =>
          SetPlaylist({ ...playlist, description: e.target.value })
        }
      />
      <button className="btn btn-outline-success" onClick={handleSubmit}>
        CONFERMA
      </button>
    </div>
  );
};

export default CreatePlaylist;
