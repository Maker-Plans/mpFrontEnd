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
        console.log('category', category);
        const categories = this.props.categories.categories;
        console.log('props', this.props);
        console.log('categories', categories);
        let crumbTrail = [];
        let cat = category;
        while (cat && cat.parentCategoryId) {
            cat = categories[cat.parentCategoryId];
            console.log('adding to crumbTrail', cat);
            crumbTrail = crumbTrail.concat(cat);
        }
        if (crumbTrail && crumbTrail.length > 0) {
            console.log('returning', crumbTrail);
            return crumbTrail;
        }
        return null;
    };

    itemRender = category => (<span>{category.name}</span>);

    render() {
        const category = this.props.category;
        if (category) {
            const breadcrumbTrail = this.createBreadcrumbTrail(category);
            console.log('breadcrumbTrail', breadcrumbTrail);
            return (
                <div id="detailView">
                    <div className="toolbar">
                        <Button type="primary" onClick={() => this.onDelete(category.id)}>Delete</Button>
                        <Button type="primary" onClick={() => this.props.editCategoryDetails()}>Edit</Button>
                    </div>
                    {breadcrumbTrail &&
                    <Breadcrumb itemRender={this.itemRender} routes={breadcrumbTrail} />
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
