import React, { Component } from "react";

import CategoryEditForm from "../components/CategoryEditForm";

import "./NewCategory.css";

const NewCategory = props => {
  const newCategory = {};

  return (
    <div id="newCategory">
      <CategoryEditForm />
    </div>
  );
};

export default NewCategory;