import React from 'react'

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

// const CategoryFilter = ({value, availableCategories, onChange}) => (
//     <FormControl
//         componentClass="select"
//         placeholder="Category"
//         onChange={e => onChange(e.target.value)}
//         value={value}
//     >
//         <option value="">Filter Category</option>
//         {availableCategories.map(cat =>
//             <option value={cat} key={cat}>{cat}</option>            
//         )}
//     </FormControl>
// );

export default CategoryFilter;