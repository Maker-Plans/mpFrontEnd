import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/categoryActions';

function mapStateToProps() {
    return {};
}

class CategoryDetailView extends Component {

    onDelete = (categoryId) => {
        this.props.deleteCategory(categoryId);
        this.props.cancelEdit(null);
    }


    render() {
        const category = this.props.category;
        if (category) {
            return (
                <div id="detailView">
                    <div className="toolbar">
                        <Button type="primary" onClick={() => this.onDelete(category.id)}>Delete</Button>
                        <Button type="primary" onClick={() => this.props.editCategoryDetails()}>Edit</Button>
                    </div>
                    <h1>
                        {category.name}
                    </h1>
                    <div id="description">
                        <p>
                            {category.description}
                        </p>
                    </div>
                </div>
            );
        }
        return 'Please select a category';
    }
}

export default connect(
    mapStateToProps,
    {
        deleteCategory,
    },
)(CategoryDetailView);
