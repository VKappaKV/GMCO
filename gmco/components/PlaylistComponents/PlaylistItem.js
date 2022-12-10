import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PlaylistContext from "../utility/PlaylistContext";

const PlaylistItem = ({ playlist, editable }) => {
  const [showEditButton, SetShowEditButton] = useState(false);
  const { SetPlaylist } = useContext(PlaylistContext);
  const router = useRouter();
  useEffect(() => {
    console.log("la playlist appare così: ", playlist);
    if (editable) SetShowEditButton(true);
  }, [playlist]);

  return (
    <div>
      <h3>{playlist.name}</h3>
      <h6>{playlist.author}</h6>
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
      {showEditButton && (
        <button
          onClick={() => {
            SetPlaylist(playlist);
            router.push("/newPlaylist");
          }}
        >
          {" "}
          EDIT{" "}
        </button>
      )}
    </div>
  );
};

export default PlaylistItem;
