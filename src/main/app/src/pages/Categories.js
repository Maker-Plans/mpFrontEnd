import React, { Component } from 'react';
import { Layout } from 'antd';
import { matchPath } from 'react-router';

import CategoryList from '../components/CategoryList';
import CategoryDetailView from '../components/CategoryDetailView';
import CategoryEditForm from '../components/CategoryEditForm';

const { Sider, Content } = Layout;

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createCategory: false,
            editCategory: false,
        };
    }

    createCategory = () => {
        this.setState({
            createCategory: true,
            editCategory: false,
        });
    };

    editCategory = () => {
        this.setState({
            createCategory: false,
            editCategory: true,
        });
    };

    cancelEdit = () => {
        this.setState({
            createCategory: false,
            editCategory: false,
        });
    };

    DisplayOrEdit = (categoryId) => {
        if (this.state.createCategory) {
            return (
                <CategoryEditForm
                    cancelEdit={this.cancelEdit} />
            );
        }
        if (this.state.editCategory) {
            return (
                <CategoryEditForm
                    categoryId={categoryId}
                    cancelEdit={this.cancelEdit} />
            );
        }
        return (
            <CategoryDetailView
                categoryId={categoryId}
                cancelEdit={this.cancelEdit}
                editCategory={this.editCategory} />
        );
    };

    render() {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/categories/:id',
            exact: true,
            strict: false,
        });
        let categoryId;
        if (match) {
            categoryId = match.params.id;
        }
        return (
            <Layout>
                <Sider theme="light">
                    <CategoryList
                        categoryId={categoryId}
                        createCategory={this.createCategory}
                        disabled={this.state.createCategory || this.state.editCategory} />
                </Sider>
                <Content style={{ minHeight: 280 }}>
                    {this.DisplayOrEdit(categoryId)}
                </Content>
            </Layout>
        );
    }
}

export default Categories;
