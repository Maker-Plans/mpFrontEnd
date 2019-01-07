import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoryData } from "../actions/index";

import CategoryListItem from "./CategoryListItem";

import "./CategoryList.css";


function mapStateToProps(state) {
  return {
    categories: state.remoteCategories
  };
}

class CategoryList extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getCategoryData();
  }
  render() {
    if (this.props.categories.length === 0) {
        return (
          <div className="category-list">
            <p>No categories found</p>
          </div>
        );
    } else {
        return (
          <div className="category-list">
            {this.props.categories.map(category => (
              <CategoryListItem key={category.id} category={category} />
            ))}
          </div>
        );
    }
  }
};

export default connect(
  mapStateToProps,
  { getCategoryData }
)(CategoryList);