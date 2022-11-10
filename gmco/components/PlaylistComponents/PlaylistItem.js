const PlaylistItem = (props) => {
  return (
    <div>
      <h3>{props.item.name}</h3>
      <p>
        TAG: #{props.item.tag} <br /> description: {props.item.description}
      </p>
    </div>
  );
};

export default PlaylistItem;
