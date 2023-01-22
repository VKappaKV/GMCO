import { useContext, useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ pp, modify, pub }) => {
  const [canEdit, SetCanEdit] = useState(false);

  useEffect(() => {
    if (modify) SetCanEdit(true);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        /* backgroundColor: "tomato", */
        margin: 0 + 5,
        flexWrap: "wrap",
      }}
    >
      <ul>
        {" "}
        {pp?.map((i) => (
          <PlaylistItem playlist={i} editable={canEdit} key={i.id} pub={pub} />
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;
