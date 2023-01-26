import { useContext, useEffect, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";

const TracksList = ({ onSearch, objData }) => {
  const [confirm, SetConfirm] = useState(false);
  const [list, SetList] = useState(new Array());
  const { playlist } = useContext(PlaylistContext);

  const RemoveSong = (song) => {
    console.log(list);
    list.pop(song);
    console.log(list);
    SetList(list);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "coloumn", alignSelf: "center" }}
    >
      <div>
        {" "}
        <h3>Risultati della ricerca:</h3>
        <ul>
          {list.map((track) => (
            <li key={track.id}>
              {track.name} by:{" "}
              {track.artists.map((artist) => {
                const names = artist.name + " ";
                return names;
              })}
            </li>
          ))}
        </ul>
        <br />
        <button
          className="btn btn-outline-success"
          onClick={() => onSearch(true)}
        >
          CERCA ANCORA
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            SetConfirm(true);
            playlist.songs.push(...list);
            onSearch(true);
            console.log("Ora aggiungo: ", list, "alla playlist");
            console.log(playlist);
          }}
        >
          AGGIUNGI CANZONI ALLA TUA PLAYLIST
        </button>
      </div>
      <ul>
        {objData.map((track) => (
          <TrackItem
            track={track}
            id={track.id}
            SetSong={SetList}
            key={track.id}
            RemoveSong={RemoveSong}
          />
        ))}
      </ul>
    </div>
  );
};

const TrackItem = ({ track, SetSong, RemoveSong }) => {
  const [added, SetAdded] = useState(true);
  return (
    <div
      style={{ display: "flex", flexDirection: "coloumn", alignSelf: "center" }}
    >
      <div style={{ alignSelf: "center" }}>
        {" "}
        <h5>{track.name}</h5>
        ARTISTS:{" "}
        {track.artists.map((artist) => {
          const names = artist.name + " ";
          return names;
        })}
        {added ? (
          <button
            className="btn btn-outline-success"
            onClick={() => {
              SetSong((list) => [...list, track]);
              SetAdded(false);
            }}
          >
            aggiungi
          </button>
        ) : (
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              RemoveSong(track);
              SetAdded(true);
            }}
          >
            rimuovi
          </button>
        )}
      </div>
      <br />
    </div>
  );
};

export { TracksList, TrackItem };
