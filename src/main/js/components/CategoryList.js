import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

import React, { Component } from "react";
import { connect } from "react-redux";
import {Treebeard, decorators} from 'react-treebeard';
import { denormalize, schema } from 'normalizr';

import { getCategoryData } from "../actions/categoryActions";

import CategoryListItem from "./CategoryListItem";

import style from "./CategoryList.css";
import "./CategoryListItem.css";


function mapStateToProps(state) {
    if (state.categories.result != undefined) {
        console.log("result: ", state.categories.result.categories);
        return {
            categories: denormalize(state.categories.result, CATEGORY_SCHEMA, state.categories.entities)
        };
    } else {
        return {
            categories: []
        };
    }
}

class CategoryList extends Component {
    constructor(){
        super();
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        const {cursor} = this.state;
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({cursor: node});
    }

  componentDidMount() {
    this.props.getCategoryData();
  }

  render() {
    if (this.props.categories.length === 0) {
        return (
          <div className="category-list">
            <p>No categories found</p>
          </div>
        );
    } else {
        return (
          <div className="category-list">
            <Treebeard
              data={this.props.categories.categories}
              onToggle={this.onToggle}
              decorators={decorators}
            />
          </div>
        );
    }
  }
};

export default connect(
  mapStateToProps,
  { getCategoryData }
)(CategoryList);