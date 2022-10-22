import { useContext } from "react";
import Navbar from "../components/UI/Navbar";
import UserContext from "../components/utility/UserContext";

const homepage = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <Navbar />
      <h1> THIS IS THE HOMEPAGE </h1>
      <p>BEN ARRIVATO {user}</p>
    </>
  );
};
export default homepage;
