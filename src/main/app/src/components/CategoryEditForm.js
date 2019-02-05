import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import { denormalize } from 'normalizr';

import { addCategory } from '../actions/categoryActions';
import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

export const history = createHashHistory();

function mapStateToProps(state) {
    if (state.categories.result !== undefined) {
        return {
            categoryTree: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities),
            categories: state.categories.result,
        };
    }
    return {};
}

class CategoryEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.category.id,
            name: props.category.name,
            description: props.category.description,
            parentCategoryId: props.category.parentCategoryId,
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { id, name, description, parentCategoryId } = this.state;
        if (id) {
            console.log(`updating category ${name}`);
            // updateCategory();
        } else {
            console.log(`adding category ${name}`);
            this.props.addCategory({
                id, name, description, parentCategoryId,
            });
        }
        this.setState({ });
    }

    handleCancelEdit = () => {
        this.setState({
            name: '',
            description: '',
        });
        history.push('/categories');
    }

    render() {
        const { name, description } = this.state;
        return (
            <div>
                <form id="categoryForm" onSubmit={this.handleSubmit}>
                    <div className="toolbar">
                        <button onClick={this.handleCancelEdit}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success btn-lg">
                            Save
                        </button>
                    </div>
                    <div className="section">
                        <h2>Category Details</h2>
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={this.handleChange}
                                placeholder="Name"
                                name="name"
                                id="name" />
                        </div>
                        <div>
                            <textarea
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Description"
                                name="description"
                                id="description" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        addCategory,
    },
)(CategoryEditForm);
