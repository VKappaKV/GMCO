import { useContext, useEffect, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";

const TracksList = ({ onSearch, objData, addSongs }) => {
  const [confirm, SetConfirm] = useState(false);
  const [list, SetList] = useState(new Array());
  const { playlist, SetPlaylist } = useContext(PlaylistContext);

  const RemoveSong = (song) => {
    console.log(list);
    list.pop(song);
    console.log(list);
    SetList(list);
  };

  return (
    <>
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
        <button onClick={() => onSearch(true)}>Search again</button>
        <button
          onClick={() => {
            SetConfirm(true);
            // addSongs(list);
            playlist.songs.push(...list);
            onSearch(true);
            // SetPlaylist((p) => ({ ...p, ([...songs,...list]) }));
            /* SetPlaylist((p) => {
              console.log("dentro il SetPlaylist", p);
              return p;
            }); */
            console.log("Ora aggiungo: ", list, "alla playlist");
            console.log(playlist);
          }}
        >
          Add Songs to your playlist
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
    </>
  );
};

const TrackItem = ({ track, SetSong, RemoveSong }) => {
  const [added, SetAdded] = useState(true);
  return (
    <div>
      <div>
        {" "}
        <h5>{track.name}</h5>
        ARTISTS:{" "}
        {track.artists.map((artist) => {
          const names = artist.name + " ";
          return names;
        })}
        {added ? (
          <button
            onClick={() => {
              SetSong((list) => [...list, track]);
              SetAdded(false);
            }}
          >
            aggiungi
          </button>
        ) : (
          <button
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
