import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthTokenCall from "../components/SpotifyAPIHandlers/AuthTokenCall";
import Navbar from "../components/UI/Navbar";
import UserContext from "../components/utility/UserContext";

const homepage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const username = JSON.parse(localStorage.getItem(user)).username;

  useEffect(() => {
    const getToken = async () => {
      const auth_token = await AuthTokenCall();
      return auth_token;
    };
    if (!localStorage.getItem("Token")) {
      getToken().then((responseToken) => {
        console.log("IMPOSTO L'ACCESS TOKEN: ", responseToken);
        localStorage.setItem("Token", responseToken);
      });
    }
  }, []);

  if (!user) {
    return (
      <>
        <button
          onClick={() => {
            router.push("/" + "");
          }}
        >
          BACK TO LOGIN
        </button>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <h1> THIS IS THE HOMEPAGE </h1>
        <p>BEN ARRIVATO {username}</p>
        <h3>LE TUE PLAYLIST</h3>
        <h3>PLAYLIST PUBBLICHE</h3>
      </>
    );
  }
};
export default homepage;
