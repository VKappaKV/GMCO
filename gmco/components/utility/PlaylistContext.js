import { createContext, useContext, useState } from "react";
import UserContext from "./UserContext";

const PlaylistContext = createContext({});

export const PlaylistContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [playlist, SetPlaylist] = useState({
    name: "",
    tag: "",
    description: "",
    songs: [],
    author: user,
    id: 0,
  });
  return (
    <PlaylistContext.Provider value={{ playlist, SetPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContext;
