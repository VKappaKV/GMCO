import { useRef, useEffect } from "react";

const PlaylistSearch = ({ onSearch, playlist, FilterPlaylist }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchItem = searchRef.current.value;
    const filtered_collection = playlist.filter(
      (i) => i.name === searchItem || i.author === searchItem
    );
    FilterPlaylist(filtered_collection);
    onSearch(false);
  };

  return (
    <div>
      <div>
        <p> SEARCH PLAYLIST</p>
      </div>
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm" onSubmit={handleSubmit}>
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body"></i>
                </div>
                <div className="col">
                  <input
                    className="form-control form-control-lg form-control-borderless"
                    type="search"
                    placeholder="Search songs titles or authors"
                    ref={searchRef}
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-lg btn-success" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSearch;
