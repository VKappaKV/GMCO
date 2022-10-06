import { useEffect, useState } from "react";
import Login from "../components/LoginComponents/Login";
import AuthTokenCall from "../components/SpotifyAPIHandlers/AuthTokenCall";

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
