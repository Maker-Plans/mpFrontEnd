import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, List } from 'antd';

import { getArticleData } from '../actions/articleActions';

function mapStateToProps(state) {
    if (state.articles !== undefined) {
        return {
            articles: state.articles,
        };
    }
    return {};
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class ArticleList extends Component {

    componentDidMount() {
        this.props.getArticleData(this.props.categoryId);
    }

    displayArticle = (e) => {
        console.log(e);
    }

    render() {
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
                dataSource={this.props.articles}
                renderItem={article => (
                    <List.Item
                        key={article.id}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />,
                            <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>
                        <List.Item.Meta
                            title={<a onClick={this.displayArticle}>{article.name}</a>}
                            description={article.description} />
                    </List.Item>
                )} />
        );
    }

}

export default connect(
    mapStateToProps,
    {
        getArticleData,
    },
)(ArticleList);
