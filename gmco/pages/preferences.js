import UserContext from "../components/utility/UserContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/Navbar";

const preferences = () => {
  const { user } = useContext(UserContext);
  const [preferenze, setPreferenze] = useState(false);
  const trackedUser = JSON.parse(localStorage.getItem(user));
  const username = trackedUser.username;

  useEffect(() => {
    if ("preferenze" in trackedUser) {
      setPreferenze(true);
    }
  }, []);
  return (
    <>
      <Navbar />
      {preferenze ? (
        <div>
          <h1>PICK YOUR PREFERENCES {username}</h1>
        </div>
      ) : (
        <h1>NON HAI PREFERENZE {username}</h1>
      )}
    </>
  );
};

export default preferences;
