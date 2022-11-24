import { createContext, useState } from "react";

const PlaylistContext = createContext({});

export const PlaylistContextProvider = ({ children }) => {
  const [playlist, SetPlaylist] = useState({
    name: "",
    tag: "",
    description: "",
    songs: [],
  });
  return (
    <PlaylistContext.Provider value={{ playlist, SetPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContext;
