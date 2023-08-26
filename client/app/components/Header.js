import "../styles/Header.css";

export default function Header() {
  return (
    <header>
      <div className="content">
        <div className="brand">
          <img src="../favicon.ico" style={{ width: "15%" }}></img>
        </div>

        <ul className="nav-links">
          <li>
            <a href="https://github.com/ghassan-bounni/AssentifyLogoDetector">
              Github
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
