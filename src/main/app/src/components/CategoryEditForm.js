import React, { Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Button, Input, TreeSelect } from 'antd';

import { addCategory, updateCategory } from '../actions/categoryActions';
import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

function mapStateToProps(state) {
    if (state.categories.result !== undefined) {
        return {
            categoryTree: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities),
            categories: state.categories.entities,
        };
    }
    return {};
}

class CategoryEditForm extends Component {

    constructor(props) {
        super(props);
        if (props.category) {
            this.state = {
                id: props.category.id,
                name: props.category.name,
                description: props.category.description,
                parentCategoryId: props.category.parentCategoryId,
                parentCategory: undefined,
            };
        } else {
            this.state = {
                id: null,
                name: '',
                description: '',
                parentCategoryId: undefined,
                parentCategory: undefined,
            };
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { id, name, description, parentCategoryId } = this.state;
        if (id) {
            this.props.updateCategory({
                id, name, description, parentCategoryId,
            });
        } else {
            this.props.addCategory({
                id, name, description, parentCategoryId,
            });
        }
        this.setState({});
        this.props.cancelEdit({
            id, name, description, parentCategoryId,
        });
    };

    handleCancelEdit = () => {
        const { id, name, description, parentCategoryId } = this.state;
        this.setState({});
        if (id) {
            this.props.cancelEdit({
                id, name, description, parentCategoryId,
            });
        } else {
            this.props.cancelEdit(undefined);
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

    handleSelectParentCategory = (value) => {
        this.setState({
            ...this.state,
            parentCategoryId: value,
        });
    };

    render() {
        const { name, description, parentCategoryId } = this.state;
        return (
            <div>
                <form id="categoryForm" onSubmit={this.handleSubmit}>
                    <div className="toolbar">
                        <Button type="default" onClick={this.handleCancelEdit} className="button">Cancel</Button>
                        <Button type="primary" onClick={this.handleSubmit} className="button">Save</Button>
                    </div>
                    <div className="section">
                        <h2>Category Details</h2>
                        {this.props.categoryTree.categories &&
                        <div>
                            <label htmlFor="parentCategory">Parent category</label>
                            <TreeSelect
                                style={{ width: 300 }}
                                value={parentCategoryId}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select a parent category"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.handleSelectParentCategory}>
                                {this.renderTreeNodes(this.props.categoryTree.categories)}
                            </TreeSelect>
                        </div>
                        }
                        <div>
                            <label htmlFor="name">Name</label>
                            <Input
                                placeholder="Category name"
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
                                placeholder="Category description"
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
        addCategory,
        updateCategory,
    },
)(CategoryEditForm);
