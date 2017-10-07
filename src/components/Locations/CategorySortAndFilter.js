import React from 'react'

import { ControlLabel, Button, Form, ButtonGroup } from 'react-bootstrap';

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

export default CategorySortAndFilter;