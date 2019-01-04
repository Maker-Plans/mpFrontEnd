import React from "react";

import CategoryListItem from "./CategoryListItem";

import "./CategoryList.css";

const CategoryList = props => {
  if (props.categories.length === 0) {
    return (
      <div className="category-list">
        <p>No categories found</p>
      </div>
    );
  } else {
    return (
      <div className="category-list">
        {props.categories.map(category => (
          <CategoryListItem key={category.id} category={category} />
        ))}
      </div>
    );
  }
};

export default CategoryList;