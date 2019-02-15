import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/categoryActions';

function mapStateToProps(state) {
    if (state.categories.entities !== undefined) {
        return {
            categories: state.categories.entities,
        };
    }
    return {};
}

class CategoryDetailView extends Component {

    onDelete = (categoryId) => {
        this.props.deleteCategory(categoryId);
        this.props.cancelEdit(null);
    };

    createBreadcrumbTrail = (category) => {
        const categories = this.props.categories.categories;
        let crumbTrail = [];
        let cat = category;
        while (cat && cat.parentCategoryId) {
            cat = categories[cat.parentCategoryId];
            crumbTrail = crumbTrail.concat(cat);
        }
        return crumbTrail && crumbTrail.length > 0 ? crumbTrail : null;
    };

    itemRender = data => (
        data.map(category => (
            <Breadcrumb.Item key={category.id}>
                <span>{category.name}</span>
            </Breadcrumb.Item>
        ))
    );

    render() {
        const category = this.props.category;

        if (category) {
            const breadcrumbTrail = this.createBreadcrumbTrail(category);
            return (
                <div id="detailView">
                    <div className="toolbar">
                        <Button
                            type="danger"
                            onClick={() => this.onDelete(category.id)}
                            className="button">Delete</Button>
                        <Button
                            type="primary"
                            onClick={() => this.props.editCategoryDetails()}
                            className="button">Edit</Button>
                    </div>
                    {breadcrumbTrail &&
                    <Breadcrumb>
                        {this.itemRender(breadcrumbTrail)}
                    </Breadcrumb>
                    }
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
