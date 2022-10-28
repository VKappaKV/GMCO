import { useContext, useEffect } from "react";
import Login from "../components/LoginComponents/Login";
import UserContext from "../components/utility/UserContext";

export default function Home() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
}
