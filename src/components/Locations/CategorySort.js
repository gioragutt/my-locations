import React from 'react'
import PropTypes from 'prop-types'

import { SortByCategoryPropType } from './util';
import { Glyphicon, Button } from 'react-bootstrap';

const SortGlyph = ({sort}) => {
    if (sort === 'asc') {
        return <span>{' '}<Glyphicon glyph="chevron-up"/></span>
    } else if (sort === 'dsc') {
        return <span>{' '}<Glyphicon glyph="chevron-down"/></span>
    }

    return null;
}

const CategorySort = ({
    sortByCategory,
    toggleCategorySort
}) => (
    <Button onClick={toggleCategorySort}>
        Sort <SortGlyph sort={sortByCategory}/>
    </Button>
);

CategorySort.propTypes = {
    sortByCategory: SortByCategoryPropType,
    toggleCategorySort: PropTypes.func.isRequired
};

export default CategorySort;