import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { matchPath } from 'react-router';

import ArticleEditForm from '../components/ArticleEditForm';
import CategoryList from '../components/CategoryList';
import ArticleDetailView from '../components/ArticleDetailView';

const { Sider, Content } = Layout;

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editArticle: false,
        };
    }

    editArticle = () => {
        this.setState({
            editArticle: true,
        });
    };

    cancelEdit = (categoryId, articleId) => {
        this.setState({
            editArticle: false,
        });
        if (articleId) {
            this.props.history.push(`/articles/${categoryId}/${articleId}`);
        } else {
            this.props.history.push(`/categories/${categoryId}`);
        }
    };

    DisplayOrEdit = (categoryId, articleId) => {
        if (articleId === undefined) {
            return (
                <ArticleEditForm
                    categoryId={categoryId}
                    cancelEdit={this.cancelEdit} />
            );
        }
        if (this.state.editArticle) {
            return (
                <ArticleEditForm
                    categoryId={categoryId}
                    articleId={articleId}
                    cancelEdit={this.cancelEdit} />
            );
        }
        return (
            <ArticleDetailView
                categoryId={categoryId}
                articleId={articleId}
                cancelEdit={this.cancelEdit}
                editArticle={this.editArticle} />
        );
    };

    render() {
        const articleMatch = matchPath(this.props.history.location.pathname, {
            path: '/articles/:categoryId/:articleId',
            exact: true,
            strict: false,
        });
        const categoryMatch = matchPath(this.props.history.location.pathname, {
            path: '/articles/:categoryId',
            exact: true,
            strict: false,
        });
        let categoryId;
        let articleId;
        if (articleMatch) {
            categoryId = articleMatch.params.categoryId;
            articleId = articleMatch.params.articleId;
        } else if (categoryMatch) {
            categoryId = categoryMatch.params.categoryId;
        }
        return (
            <Layout>
                <Sider theme="light">
                    <CategoryList
                        categoryId={categoryId}
                        editCategory={articleId === undefined || this.state.editCategory} />
                </Sider>
                <Content style={{ minHeight: 280 }}>
                    {this.DisplayOrEdit(categoryId, articleId)}
                </Content>
            </Layout>
        );
    }

}

export default withRouter(Articles);
