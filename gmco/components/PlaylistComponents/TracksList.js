const TracksList = ({ onSearch, objData }) => {
  return (
    <>
      <p>
        {" "}
        Risultati della ricerca:
        <br />
        <button onClick={() => onSearch(true)}>Search again</button>
      </p>
      <ul>
        <TrackItem data={objData} />
      </ul>
    </>
  );
};

const TrackItem = ({ data }) => {
  return (
    <div>
      <p>I'm a song {data}</p>
    </div>
  );
};

export { TracksList, TrackItem };
