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

    createNewCategory = () => {
        this.setState({ displayCategory: null, editCategory: true });
    };

    editCategoryDetails = () => {
        this.setState({ editCategory: true });
    };

    cancelEdit = (category) => {
        this.setState({ displayCategory: category, editCategory: false });
    };

    DisplayOrEdit = () => {
        if (this.state.editCategory) {
            console.log('editing', this.state.displayCategory);
            return (
                <CategoryEditForm
                    category={this.state.displayCategory}
                    cancelEdit={this.cancelEdit} />
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
                    <CategoryList
                        editCategory={this.state.editCategory}
                        displayCategoryDetails={this.displayCategoryDetails}
                        createNewCategory={this.createNewCategory} />
                </Sider>
                <Content style={{ minHeight: 280 }}>
                    {this.DisplayOrEdit()}
                </Content>
            </Layout>
        );
    }
}

export default Categories;
