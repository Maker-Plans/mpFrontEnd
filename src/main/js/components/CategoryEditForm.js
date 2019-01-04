import React, { Component } from "react";

import "./CategoryEditForm.css";

class CategoryEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: {
        name: "",
        description: ""
      }
    };
  }

  componentDidMount() {
    this.setState({
      currentCategory: Object.assign(
        {},
        this.state.currentCategory,
        this.props.contact
      )
    });
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          <button onClick={this.props.onCancel}>Cancel</button>
          <button onClick={() => this.props.onSave(this.state.currentCategory)}>
            Save
          </button>
        </div>
        <form id="categoryForm">
          <div className="section">
            <h2>Category Details</h2>
            <div>
              <input
                type="text"
                value={this.state.currentCategory.name}
                onChange={event =>
                  this.setState({
                    currentCategory: {
                      ...this.state.currentCategory,
                      name: event.target.value
                    }
                  })
                }
                placeholder="Name"
                name="name"
              />
            </div>
            <div>
              <textarea
                value={this.state.currentCategory.description}
                onChange={event =>
                  this.setState({
                    currentCategory: {
                      ...this.state.currentCategory,
                      description: event.target.value
                    }
                  })
                }
                placeholder="Description"
                name="description"
             />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CategoryEditForm;