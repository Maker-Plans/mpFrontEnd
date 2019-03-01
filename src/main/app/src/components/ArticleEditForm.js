import React, { Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Button, Input, TreeSelect } from 'antd';

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';
import { addArticle, updateArticle } from '../actions/articleActions';

function mapStateToProps(state) {
    if (state.categories.entities !== undefined) {
        return {
            categoryTree: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities),
            categories: state.categories.entities,
        };
    }
    return {};
}

class ArticleEditForm extends Component {

    constructor(props) {
        super(props);
        if (props.article) {
            this.state = {
                id: props.article.id,
                name: props.article.name,
                description: props.article.description,
                categoryId: props.article.categoryId,
                category: undefined,
            };
        } else {
            this.state = {
                id: null,
                name: '',
                description: '',
                categoryId: undefined,
                category: undefined,
            };
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { id, name, description, categoryId } = this.state;
        if (id) {
            this.props.updateArticle({
                id, name, description, categoryId,
            });
        } else {
            this.props.addArticle({
                id, name, description, categoryId,
            });
        }
        this.setState({});
        this.props.cancelArticleEdit({
            id, name, description, categoryId,
        });
    };

    handleCancelEdit = () => {
        const { id, name, description, categoryId } = this.state;
        this.setState({});
        if (id) {
            this.props.cancelArticleEdit({
                id, name, description, categoryId,
            });
        } else {
            this.props.cancelArticleEdit(undefined);
        }
    };

    renderTreeNodes = data => data.map((item) => {
        if (this.state.id && this.state.id === item.id) {
            return (<TreeSelect.TreeNode
                {...item}
                title={item.name}
                key={item.id}
                value={item.id}
                dataRef={item}
                disabled />);
        }
        if (item.categories) {
            return (
                <TreeSelect.TreeNode title={item.name} key={item.id} value={item.id} dataRef={item}>
                    {this.renderTreeNodes(item.categories)}
                </TreeSelect.TreeNode>
            );
        }
        return <TreeSelect.TreeNode {...item} title={item.name} key={item.id} value={item.id} dataRef={item} />;
    });

    handleSelectCategory = (value) => {
        this.setState({
            ...this.state,
            categoryId: value,
        });
    };

    render() {
        const { name, description, categoryId } = this.state;
        return (
            <div>
                <form id="categoryForm" onSubmit={this.handleSubmit}>
                    <div className="toolbar">
                        <Button type="default" onClick={this.handleCancelEdit} className="button">Cancel</Button>
                        <Button type="primary" onClick={this.handleSubmit} className="button">Save</Button>
                    </div>
                    <div className="section">
                        <h2>Article Details</h2>
                        <div>
                            <label htmlFor="category">Category</label>
                            <TreeSelect
                                style={{ width: 300 }}
                                value={categoryId}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select a category"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.handleSelectCategory}>
                                {this.renderTreeNodes(this.props.categoryTree.categories)}
                            </TreeSelect>
                        </div>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Input
                                placeholder="Article name"
                                type="text"
                                value={name}
                                onChange={this.handleChange}
                                name="name"
                                id="name" />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Input.TextArea
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Article description"
                                name="description"
                                id="description" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        addArticle,
        updateArticle,
    },
)(ArticleEditForm);
