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
        <CategoryList categories={this.props.data} />

        <Route
          path={`${match.url}/:id`}
          render={props => this.renderCategoryDetails(props)}
        />
        <Route
          exact
          path={match.url}
          render={() => (
            <div id="categoryDetail">
              <p>Please select a category.</p>
            </div>
          )}
        />
      </div>
    );
  }

  renderCategoryDetails(routeProps) {
    // get selected contact by the id that was passed in the URL
    const selectedCategory = this.props.data.find(
      c => c.id === routeProps.match.params.id
    );

    if (selectedCategory) {
      return (
        <div id="categoryDetail">
          {this.props.editedCategory ? (
            <CategoryEditForm
              category={selectedCategory}
              onCancel={this.props.cancelEdit}
              onSave={this.props.saveCategory}
            />
          ) : (
            <CategoryDetailView
              category={selectedCategory}
              onEdit={this.props.editCategory}
              onDelete={this.props.deleteCategory}
            />
          )}
        </div>
      );
    } else {
      return (
        <div>
          <p>Category not found</p>
        </div>
      );
    }
  }
}

export default Categories;