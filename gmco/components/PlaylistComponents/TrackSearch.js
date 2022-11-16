import { useEffect, useRef } from "react";
import SearchCall from "../SpotifyAPIHandlers/SearchCall";
import styles from "./TrackSearch.module.css";

const TrackSearch = ({ onSearch, handleObj }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchItem = searchRef.current.value;
    console.log("Stai cercando: ", searchItem);
    const accessToken = localStorage.getItem("Token");
    SearchCall(accessToken, searchItem)
      .then((response) => {
        console.log(response);
        handleObj(searchItem);
        onSearch(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div>
        <p> SEARCH SONGS TO ADD TO YOUR PLAYLIST</p>
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

export default TrackSearch;
