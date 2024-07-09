import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Indivíduos</NavLink>
        </li>
        <li>
          <NavLink to="/genomas">Sequências</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
