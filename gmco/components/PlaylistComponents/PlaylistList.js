import { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ pp, modify }) => {
  const [canEdit, SetCanEdit] = useState(false);

  useEffect(() => {
    if (modify) SetCanEdit(true);
  }, []);

  return (
    <div>
      <ul>
        {" "}
        {pp?.map((i) => (
          <PlaylistItem playlist={i} editable={canEdit} />
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;
