import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/categoryActions';
import CategoryCrumbtrail from './categoryCrumbtrail';
import ArticleList from './ArticleList';

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
        this.props.history.push('/categories');
    };

    render() {
        if (this.props.categoryId && this.props.categories) {
            const category = this.props.categories.categories[this.props.categoryId];
            return (
                <div id="detailView">
                    <div className="toolbar">
                        <Button
                            type="danger"
                            onClick={() => this.onDelete(category.id)}
                            className="button">Delete</Button>
                        <Button
                            type="primary"
                            onClick={() => this.props.editCategory()}
                            className="button">Edit</Button>
                        <Button
                            type="default"
                            className="button">Add Article</Button>
                    </div>
                    <CategoryCrumbtrail category={category} />
                    <h1>
                        {category.name}
                    </h1>
                    <div id="description">
                        <p>
                            {category.description}
                        </p>
                    </div>
                    <ArticleList categoryId={category.id} />
                </div>
            );
        }
        return 'Please select a category';
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        deleteCategory,
    },
)(CategoryDetailView));
