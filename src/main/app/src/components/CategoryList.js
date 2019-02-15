import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tree, Button } from 'antd';
import { denormalize } from 'normalizr';

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

import { getCategoryData } from '../actions/categoryActions';

const { TreeNode } = Tree;

function mapStateToProps(state) {
    if (state.categories.result !== undefined) {
        return {
            categories: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities),
        };
    }
    return {};
}

class CategoryList extends Component {
    state = {
        expandedKeys: [],
        autoExpandParent: true,
        selectedKeys: [],
    };

    componentDidMount() {
        this.props.getCategoryData();
    }

    onExpand = (expandedKeys) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
        this.props.displayCategoryDetails(info.node.props.dataRef);
    };

    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.categories) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.categories)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} title={item.name} key={item.id} dataRef={item} />;
        });
    }

    render() {
        if (this.props.categories && this.props.categories.categories && this.props.categories.categories.length) {
            return (
                <div>
                    <div>
                        <Button type="primary" onClick={this.props.createNewCategory} disabled={this.props.editCategory} className="button">New</Button>
                    </div>
                    <Tree
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}>
                        {this.renderTreeNodes(this.props.categories.categories)}
                    </Tree>
                </div>
            );
        }
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.props.createNewCategory} disabled={this.props.editCategory} className="button">New</Button>
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
