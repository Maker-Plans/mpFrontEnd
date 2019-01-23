import { CATEGORY_SCHEMA } from '../constants/normalizr-constants';

import React, { Component } from "react";
import { connect } from "react-redux";
import {Treebeard} from 'react-treebeard';
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

  const decorators = {
      Loading: (props) => {
      console.log("Loading", props);
          return (
              <div style={props.style}>
                  loading...
              </div>
          );
      },
      Toggle: (props) => {
      console.log("Toggle", props);
          return (
              <div style={props.style}>
                  <svg height={props.height} width={props.width}>
                      // Vector Toggle Here
                  </svg>
              </div>
          );
      },
      Header: ({node, style}) => {
          return (
              <div>
                  {node.name}
              </div>
          );
      },
      Container: (props) => {
        const {decorators, terminal, onClick, node} = props;
          return (
              <div className="category-list-item">
                  <decorators.Header node={node}  style={style.header}/>
              </div>
          );
      }
  };

class CategoryList extends Component {
  constructor() {
    super();
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
    console.log(this.props.categories.categories);
        return (
          <div className="category-list">
            <Treebeard
              data={this.props.categories.categories}
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