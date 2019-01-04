import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li className="brand">
          <Link to="/">MakerPlans</Link>
        </li>
        <li id="newCategoryLink">
          <Link to="/new-category">+ New Category</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;