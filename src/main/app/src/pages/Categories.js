import React, { Component } from 'react';
import { Layout } from 'antd';

import CategoryList from '../components/CategoryList';
import CategoryDetailView from '../components/CategoryDetailView';
import CategoryEditForm from '../components/CategoryEditForm';

const { Sider, Content } = Layout;

class Categories extends Component {

    state = {
        displayCategory: null,
        editCategory: false,
    };

    displayCategoryDetails = (category) => {
        this.setState({ displayCategory: category, editCategory: false });
    };

    editCategoryDetails = () => {
        this.setState({ editCategory: true });
    };

    DisplayOrEdit = () => {
        if (this.state.editCategory) {
            console.log('editing', this.state.displayCategory);
            return (
                <CategoryEditForm
                    category={this.state.displayCategory} />
            );
        }
        return (
            <CategoryDetailView
                category={this.state.displayCategory}
                editCategoryDetails={this.editCategoryDetails} />
        );
    };

    render() {
        return (
            <Layout>
                <Sider theme="light">
                    <CategoryList displayCategoryDetails={this.displayCategoryDetails} />
                </Sider>
                <Content style={{ minHeight: 280 }}>
                    {this.DisplayOrEdit()}
                </Content>
            </Layout>
        );
    }
}

export default Categories;
