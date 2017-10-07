import React from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, MenuItem } from 'react-bootstrap';

const DropdownOption = ({
    value,
    title,
    onClick,
    isSelected = false
}) => (
    <MenuItem
        onSelect={() => onClick(value)}
        active={isSelected}
    >
        {title}
    </MenuItem>
);

const CategoryFilter = ({
    value,
    availableCategories,
    onChange
}) => (
    <DropdownButton title={value ? value : 'Filter Category'} id="category-filter-dropdown">
        <DropdownOption value="" title="Remove Filter" onClick={onChange}/>
        <MenuItem divider />
        {
            availableCategories.map(cat => (
                <DropdownOption
                    value={cat}
                    key={cat}
                    title={cat}
                    onClick={onChange}
                    isSelected={cat === value}
                />
            ))
        }
    </DropdownButton>
);

CategoryFilter.propTypes = {
    value: PropTypes.string.isRequired,
    availableCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
};

export default CategoryFilter;