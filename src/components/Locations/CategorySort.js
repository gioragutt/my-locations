import React from 'react'

import { Glyphicon, Button } from 'react-bootstrap';

const SortGlyph = ({sort}) => {
    if (sort === 'asc') {
        return <span>{' '}<Glyphicon glyph="chevron-up"/></span>
    } else if (sort === 'dsc') {
        return <span>{' '}<Glyphicon glyph="chevron-down"/></span>
    }

    return null;
}

const CategorySort = ({sortByCategory, toggleCategorySort}) => (
    <Button onClick={toggleCategorySort}>
        Sort <SortGlyph sort={sortByCategory}/>
    </Button>
);

export default CategorySort;