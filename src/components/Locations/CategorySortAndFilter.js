import React from 'react'
import PropTypes from 'prop-types'

import { ControlLabel, Button, Form, ButtonGroup } from 'react-bootstrap';

import { CategoriesListPropType, SortByCategoryPropType } from './util';
import CategorySort from './CategorySort';
import CategoryFilter from './CategoryFilter';

const CategorySortAndFilter = ({
    filterValue,
    availableCategories,
    onFilterChange,
    resetFilter,
    sortByCategory,
    toggleCategorySort
}) => (
    <Form inline>
        <ControlLabel className="category-control-lable">Category</ControlLabel>
        <ButtonGroup>
            <CategoryFilter
                value={filterValue}
                availableCategories={availableCategories}
                onChange={onFilterChange}
            />
            <Button onClick={resetFilter}>Reset</Button>
            <CategorySort
                sortByCategory={sortByCategory}
                toggleCategorySort={toggleCategorySort}
            />
        </ButtonGroup>
    </Form>
);

CategorySortAndFilter.propTypes = {
    filterValue: PropTypes.string.isRequired,
    availableCategories: CategoriesListPropType,
    onFilterChange: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    sortByCategory: SortByCategoryPropType,
    toggleCategorySort: PropTypes.func.isRequired
};

export default CategorySortAndFilter;