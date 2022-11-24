import UserContext from "../components/utility/UserContext";
import { useContext } from "react";
import Navbar from "../components/UI/Navbar";
import { useRouter } from "next/router";

const profile = () => {
  const { user } = useContext(UserContext);
  const username = JSON.parse(localStorage.getItem(user)).username;
  const router = useRouter();

  return (
    <>
      <Navbar />
      <h1>This is your Profile Page {username}</h1>
      <div className="list-group">
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          CHANGE USERNAME
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          UPDATE PASSWORD
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => {
            router.push("/" + "preferences");
          }}
        >
          SET YOUR PREFERENCES
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          style={{ color: "red" }}
        >
          DELETE USER
        </button>
      </div>
    </>
  );
};
export default profile;
