import React from 'react';
import Navbar from '../Navbar';
import PropTypes from 'prop-types'

const CategoriesNavbar = ({
    categorySelected,
    onAdd,
    onRemove,
    onEdit
}) => {
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

CategoriesNavbar.propTypes = {
    categorySelected: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default CategoriesNavbar;