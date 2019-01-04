import React from "react";
import { NavLink } from "react-router-dom";

import "./CategoryListItem.css";

const CategoryListItem = props => {
  const category = props.category;
  return (
    <div className="category-list-item">
      <NavLink to={`/category/${category.id}`} activeClassName="activeLink">
        {`${category.name}`}
      </NavLink>
    </div>
  );
};

export default CategoryListItem;