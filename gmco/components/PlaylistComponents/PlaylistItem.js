import { useEffect } from "react";

const PlaylistItem = ({ playlist }) => {
  useEffect(() => {
    console.log("la playlist appare così: ", playlist);
  }, [playlist]);

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
              {track.artists?.map((artist) => {
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
