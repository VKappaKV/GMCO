import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div
          className={styles.clickable}
          onClick={() => {
            router.push("/homepage");
          }}
        >
          <a className="navbar-brand">HOME</a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div
              className={styles.clickable}
              onClick={() => {
                router.push("/profile");
              }}
            >
              <a className="nav-link active" aria-current="page" href="#">
                Profile
              </a>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            router.push("/" + "");
            localStorage.setItem("Token", "");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
