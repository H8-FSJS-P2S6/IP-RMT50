import { useNavigate } from "react-router-dom";
import { Dropdown, initMDB } from "mdb-ui-kit";
import "mdb-ui-kit/css/mdb.min.css"; // Import CSS for MDB UI Kit
import { useEffect } from "react";
initMDB({ Dropdown });

export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const dropdown = document.querySelector('[data-mdb-toggle="dropdown"]');
    if (dropdown) {
      new Dropdown(dropdown);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
        <span className="font-naruto text-lg font-bold tracking-wider text-orange-500 lg:text-xl">N a r u t o</span>
          <div className="d-flex justify-content-center flex-grow-1">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <button className="btn btn-link nav-link" type="button">
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" type="button">
                  User
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" type="button">
                  Village
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" type="button">
                  Character
                </button>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdolcNxLjMcG3Ga9sRBHm6TcXZW7KcrjrymwmFaOYQGAdgXPvnNQKjzIfQbtrenhoeGBg&usqp=CAU"
                  className="rounded-circle"
                  height={25}
                  alt="Avatar"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
