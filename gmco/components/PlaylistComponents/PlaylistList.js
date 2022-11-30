import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ pp }) => {
  return (
    <div>
      <ul>
        {" "}
        {pp?.map((i) => (
          <PlaylistItem playlist={i} />
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;
