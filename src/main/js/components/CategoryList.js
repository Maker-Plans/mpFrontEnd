import React from "react";
import { connect } from "react-redux";

import CategoryListItem from "./CategoryListItem";

import "./CategoryList.css";

const mapStateToProps = state => {
  return { categories: state.categories };
};

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return (
      <div className="category-list">
        <p>No categories found</p>
      </div>
    );
  } else {
    return (
      <div className="category-list">
        {categories.map(category => (
          <CategoryListItem key={category.id} category={category} />
        ))}
      </div>
    );
  }
};

export default connect(mapStateToProps)(CategoryList);