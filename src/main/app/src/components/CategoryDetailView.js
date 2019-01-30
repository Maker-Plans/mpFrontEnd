import React from "react";

const CategoryDetailView = props => {
  const category = props.category;
  return (
    <div id="detailView">
      <div className="toolbar">
        <button onClick={() => props.onDelete(category.id)}>Delete</button>
        <button onClick={() => props.onEdit(category)}>Edit</button>
      </div>
      <h1>
        {category.name}
      </h1>
      <div id="description">
        <p>
          {category.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryDetailView;