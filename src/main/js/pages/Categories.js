import React, { Component } from "react";
import { Route } from "react-router-dom";

import CategoryList from "../components/CategoryList";
import CategoryEditForm from "../components/CategoryEditForm";
import CategoryDetailView from "../components/CategoryDetailView";

import "./Categories.css";

class Categories extends Component {
  render() {
    const match = this.props.match;
    return (
      <div className="categories">
        <CategoryList />
      </div>
    );
  }
}

export default Categories;