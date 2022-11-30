import { useContext, useEffect } from "react";
import Login from "../components/LoginComponents/Login";
import UserContext from "../components/utility/UserContext";
import AuthTokenCall from "../components/SpotifyAPIHandlers/AuthTokenCall";

export default function Home() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
    const getToken = async () => {
      const auth_token = await AuthTokenCall();
      return auth_token;
    };

    getToken().then((responseToken) => {
      console.log("[HOMEPAGE] IMPOSTO L'ACCESS TOKEN: ", responseToken);
      localStorage.setItem("Token", responseToken);
    });
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
}
