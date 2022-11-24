import { useContext } from "react";
import PlaylistContext from "../utility/PlaylistContext";

const PlaylistItem = () => {
  const { playlist, SetPlaylist } = useContext(PlaylistContext);

  return (
    <div>
      <h3>{playlist.name}</h3>
      <div>
        TAG: #{playlist.tag} <br /> description: {playlist.description} <br />{" "}
        songs:{" "}
        <ul>
          {playlist.songs.map((track) => (
            <li key={track.id}>
              {track.name} by:{" "}
              {track.artists.map((artist) => {
                const names = artist.name + " ";
                return names;
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistItem;
