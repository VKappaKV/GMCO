import { useRouter } from "next/router";
import { useContext } from "react";
import Navbar from "../components/UI/Navbar";
import UserContext from "../components/utility/UserContext";

const homepage = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  console.log(user);
  const username = JSON.parse(localStorage.getItem(user)).username;

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
