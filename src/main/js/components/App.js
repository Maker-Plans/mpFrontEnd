import React, { Component } from "react";
import ReactDOM from "react-dom";
import { addCategory } from "../actions/index";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { createHashHistory } from 'history'

import "./App.css";

import * as categoryApi from "../api/category";

import Header from "./Header";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import NewCategory from "../pages/NewCategory";

export const history = createHashHistory()

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      editedCategory: null
    };

    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.createNewCategory = this.createNewCategory.bind(this);
  }

	componentDidMount() {
	    categoryApi.getCategoriesForArticle().then(response => this.setState({ categories: response.data.categories }));
	}

  handleEditCategory(category) {
    this.setState({ editedCategory: category.id });
  }

  handleDeleteCategory(id) {
    categoryApi.deleteCategory(id).then(() => {
      this.setState({
        categories: this.state.categories.filter(c => c.id !== id)
      });
      history.push("/categories");
    });
  }

  handleCancelEdit() {
    this.setState({ editedCategory: null });
    history.push("/categories");
  }

  handleSaveCategory(category) {
    if (category.id) {
      this.updateCategory(category);
    } else {
      this.createNewCategory(category);
    }
  }

  updateCategory(category) {
    categoryApi.updateCategory(category).then(response => {
      const otherCategories = this.state.categories.filter(
        c => c.id !== contact.id
      );
      this.setState({
        categories: [...otherCategories, response.data.category],
        editedCategory: null
      });
    });
  }

  createNewCategory(category) {
    api.createCategory(category).then(response => {
      const otherCategories = this.state.categories.filter(c => c !== category);
      this.setState({
        categories: [...otherCategories, response.data.category],
        editedCategory: null
      });

      history.push("/categories");
    });
  }

	render() {
		return (
            <div className="App">
                <Header />
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            path={`/categories`}
                            render={props => (
                                <Categories
                                    data={this.state.categories}
                                    editCategory={this.handleEditCategory}
                                    deleteCategory={this.handleDeleteCategory}
                                    cancelEdit={this.handleCancelEdit}
                                    saveCategory={this.handleSaveCategory}
                                    editedCategory={this.state.editedCategory}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            path="/new-category"
                            render={props => (
                                <NewCategory />
                            )}
                        />
                    </Switch>
                </main>
            </div>
        );
	}
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;