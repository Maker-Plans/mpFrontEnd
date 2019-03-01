import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    if (state.categories.entities !== undefined) {
        return {
            categories: state.categories.entities,
        };
    }
    return {};
}

class CategoryCrumbtrail extends Component {

    createBreadcrumbTrail = (category) => {
        const categories = this.props.categories.categories;
        let crumbTrail = [];
        let cat = category;
        crumbTrail = crumbTrail.concat(cat);
        while (cat && cat.parentCategoryId) {
            cat = categories[cat.parentCategoryId];
            crumbTrail = crumbTrail.concat(cat);
        }
        return crumbTrail && crumbTrail.length > 0 ? crumbTrail.reverse() : null;
    };

    renderBreadcrumbTrail = (breadcrumbTrail) => {
        if (breadcrumbTrail) {
            return this.itemRender(breadcrumbTrail);
        }
        return null;
    }

    itemRender = data => (
        data.map(category => (
            <Breadcrumb.Item key={category.id}>
                <span>{category.name}</span>
            </Breadcrumb.Item>
        ))
    );

    render() {
        const breadcrumbTrail = this.createBreadcrumbTrail(this.props.category);
        return (
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                { this.renderBreadcrumbTrail(breadcrumbTrail) }
            </Breadcrumb>
        );
    }
}


export default connect(
    mapStateToProps,
)(CategoryCrumbtrail);
