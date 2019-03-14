import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteArticle } from '../actions/articleActions';
import CategoryCrumbtrail from './categoryCrumbtrail';

function mapStateToProps(state) {
    return {
        categories: state.categories.entities,
        articles: state.articles,
    };
}

class ArticleDetailView extends Component {

    onDelete = (articleId) => {
        this.props.deleteArticle(articleId);
        this.props.history.push(`/articles/${this.props.categoryId}`);
    };

    render() {
        if (this.props.categoryId && this.props.categories) {
            const category = this.props.categories.categories[this.props.categoryId];
            if (this.props.articleId && this.props.articles) {
                const article = this.props.articles.articles[this.props.articleId];
                return (
                    <div id="detailView">
                        <div className="toolbar">
                            <Button
                                type="danger"
                                onClick={() => this.onDelete(article.id)}
                                className="button">Delete</Button>
                            <Button
                                type="primary"
                                onClick={() => this.props.editArticle()}
                                className="button">Edit</Button>
                        </div>
                        <CategoryCrumbtrail category={category} />
                        <h1>
                            {article.name}
                        </h1>
                        <div id="description">
                            <p>
                                {article.description}
                            </p>
                        </div>
                    </div>
                );
            }
        }
        return 'Please select a category';
    }
}

export default withRouter(connect(
    mapStateToProps,
    {
        deleteArticle,
    },
)(ArticleDetailView));
