import { useContext } from "react";
import UserContext from "../utility/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const username = JSON.parse(localStorage.getItem(user)).username;

  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/homepage">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href="/profile"
              >
                YOUR PROFILE
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            router.push("/" + "");
            localStorage.setItem("Token", "");
          }}
        >
          Logout {username}
        </button>
      </div>
    </nav>
  );
}
