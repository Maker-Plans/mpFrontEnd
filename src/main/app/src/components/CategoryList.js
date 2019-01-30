import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
import { denormalize } from 'normalizr';

import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

import { getCategoryData } from '../actions/categoryActions';

const { TreeNode } = Tree;

function mapStateToProps(state) {
    if (state.categories.result !== undefined) {
        console.log('categories loaded:', state.categories);
        return {
            categories: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities),
        };
    }
    return {
    };
}

class CategoryList extends Component {
    componentDidMount() {
        this.props.getCategoryData();
    }

    onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
        this.setState({ selectedKeys });
    }

    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} title={item.name} key={item.id} dataRef={item} />;
        });
    }

    render() {
        if (this.props.categories && this.props.categories.categories && this.props.categories.categories.length) {
            return (
                <Tree loadData={this.onLoadData}>
                    {this.renderTreeNodes(this.props.categories.categories)}
                </Tree>
            );
        }
        return 'loading tree';
    }
}

export default connect(
  mapStateToProps,
  { getCategoryData },
)(CategoryList);
