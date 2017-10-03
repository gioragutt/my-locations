import React from 'react';
import Navbar from '../Navbar';

const CategoriesNavbar = ({categorySelected, onAdd, onRemove, onEdit}) => {
    return <Navbar
        title="Categories"
        items={[
            {
                title: 'Add',
                onClick: onAdd,
            },
            {
                title: 'Edit',
                onClick: onEdit,
                disabled: !categorySelected
            },
            {
                title: 'Remove',
                onClick: onRemove,
                disabled: !categorySelected
            },
        ]}
    />
};

export default CategoriesNavbar;