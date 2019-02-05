import React from 'react';

const CategoryDetailView = (props) => {
    const category = props.category;
    if (category) {
        return (
            <div id="detailView">
                <div className="toolbar">
                    {/* <button onClick={() => props.onDelete(category.id)}>Delete</button> */}
                    <button onClick={() => props.editCategoryDetails()}>Edit</button>
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
    }
    return 'Please select a category';
};

export default CategoryDetailView;
