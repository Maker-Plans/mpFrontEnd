import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, List } from 'antd';

import { getArticleData, likeArticle } from '../actions/articleActions';

function mapStateToProps(state) {
    if (state.categories !== undefined) {
        return {
            categories: state.categories.entities.categories,
            articles: state.articles,
        };
    }
    return {};
}

class ArticleList extends Component {

    likeAction = (article) => {
        this.props.likeArticle(article);
    };

    render() {
        if (this.props.categories[this.props.categoryId] &&
            this.props.categories[this.props.categoryId].articles === undefined) {
            this.props.getArticleData(this.props.categoryId);
        }
        if (this.props.articles && this.props.categories[this.props.categoryId].articles) {
            return (
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={Object.values(this.props.categories[this.props.categoryId].articles)}
                    renderItem={articleId => (
                        <List.Item
                            key={articleId}
                            actions={[
                                <span>
                                    <Button
                                        shape="round"
                                        onClick={
                                            () => this.likeAction(this.props.articles.articles[articleId])
                                        }
                                        icon="like-o">
                                        {this.props.articles.articles[articleId].likes}
                                    </Button>
                                </span>]}>
                            <List.Item.Meta
                                title={<Link
                                    to={`/articles/${this.props.articles.articles[articleId].categoryId}/${this.props.articles.articles[articleId].id}`}>{this.props.articles.articles[articleId].name}</Link>}
                                description={this.props.articles.articles[articleId].description} />
                        </List.Item>
                    )} />
            );
        }
        return (
            <div>
                loading articles
            </div>
        );
    }

}

export default connect(
    mapStateToProps,
    {
        getArticleData,
        likeArticle,
    },
)(ArticleList);
