import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';

import { addCategory } from '../actions/categoryActions';

export const history = createHashHistory();

function mapDispatchToProps(dispatch) {
    return {
        addCategory: category => dispatch(addCategory(category)),
    };
}

class CategoryEditForm extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, description } = this.state;
        console.log(`adding category ${name}`);
        this.props.addCategory({ name, description });
        this.setState({
            name: '',
            description: '',
        });
    }

    handleCancelEdit() {
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

export default connect(null, mapDispatchToProps)(CategoryEditForm);
