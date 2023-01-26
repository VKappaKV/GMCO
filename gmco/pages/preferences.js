import UserContext from "../components/utility/UserContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/Navbar";
import AuthTokenCall from "../components/SpotifyAPIHandlers/AuthTokenCall";
import GetCategories from "../components/SpotifyAPIHandlers/GetCategoriesCall";
import CategoriesList from "../components/UI/CategoriesList";
import { useRouter } from "next/router";

const preferences = () => {
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const auth_token = await AuthTokenCall();
      return auth_token;
    };
    const handleCategorie = async (accessToken) => {
      const dataResponse = await GetCategories(accessToken);
      return dataResponse;
    };

    if (!localStorage.getItem("Token")) {
      getToken()
        .then((accessToken) => {
          console.log("[PREFERENCES] Imposto il Token: ", accessToken);
          localStorage.setItem("Token", accessToken);
        })
        .catch((e) => console.log("cannot get the token: ", e));
    }
    const auth_token = localStorage.getItem("Token");
    handleCategorie(auth_token)
      .then((response) => {
        setData(response.categories.items);
      })
      .catch((e) => console.log(e));
  }, []);

  const userHasChosenPreferences = () => {
    router.push("/homepage");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Navbar />
      <div style={{ flex: 3 }}>
        {data ? <CategoriesList data={data} /> : null}
      </div>
      <button
        style={{
          alignSelf: "center",
          height: "max-content",
          width: "max-content",
          flex: 2,
        }}
        className="btn btn-success"
        onClick={userHasChosenPreferences}
      >
        FATTO
      </button>
    </div>
  );
};

export default preferences;
