import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tree, Button } from 'antd';
import { denormalize } from 'normalizr';

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

import { getCategoryData } from '../actions/categoryActions';

const { TreeNode } = Tree;

function mapStateToProps(state) {
    console.log('categories', state.categories);
    if (state.categories.result !== undefined) {
        return {
            categories: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities),
        };
    }
    return {};
}

class CategoryList extends Component {
    state = {
        autoExpandParent: true,
    };

    componentDidMount() {
        this.props.getCategoryData();
    }

    onExpand = () => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            autoExpandParent: false,
        });
    };

    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.categories) {
                if (this.props.editCategory) {
                    return (
                        <TreeNode title={item.name} key={item.id} dataRef={item}>
                            {this.renderTreeNodes(item.categories)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode title={<Link to={`/categories/${item.id}`}>{item.name}</Link>} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.categories)}
                    </TreeNode>
                );
            }
            if (this.props.editCategory) {
                return <TreeNode {...item} title={item.name} key={item.id} dataRef={item} />;
            }
            return <TreeNode {...item} title={<Link to={`/categories/${item.id}`}>{item.name}</Link>} key={item.id} dataRef={item} />;
        });
    }

    render() {
        if (this.props.categories && this.props.categories.categories && this.props.categories.categories.length) {
            return (
                <div>
                    <div>
                        <Button type="primary" onClick={this.props.createCategory} disabled={this.props.editCategory} className="button">New</Button>
                    </div>
                    <Tree
                        disabled={this.props.editCategory}
                        onExpand={this.onExpand}
                        expandedKeys={[this.props.categoryId]}
                        autoExpandParent={this.state.autoExpandParent}
                        selectedKeys={[this.props.categoryId]}>
                        {this.renderTreeNodes(this.props.categories.categories)}
                    </Tree>
                </div>
            );
        }
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.props.createCategory} disabled={this.props.editCategory} className="button">New</Button>
                </div>
                loading tree
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        getCategoryData,
    },
)(CategoryList);
