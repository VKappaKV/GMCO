import UserContext from "../components/utility/UserContext";
import { useContext } from "react";
import Navbar from "../components/UI/Navbar";
import { redirect } from "next/dist/server/api-utils";

const profile = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <h1>This is your Profile Page {user}</h1>
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
          SET BIOGRAPHY
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
        >
          SET YOUR PREFERENCES
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          DELETE USER
        </button>
      </div>
    </>
  );
};
export default profile;
