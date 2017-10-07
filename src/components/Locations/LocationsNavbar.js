import React from 'react';
import PropTypes from 'prop-types'
import Navbar from '../Navbar';

const LocationsNavbar = ({
    locationSelected,
    onAdd,
    onRemove,
    onEdit
}) => {
    return <Navbar
        title="Locations"
        items={[
            {
                title: 'Add',
                onClick: onAdd,
            },
            {
                title: 'Edit',
                onClick: onEdit,
                disabled: !locationSelected
            },
            {
                title: 'Remove',
                onClick: onRemove,
                disabled: !locationSelected
            },
        ]}
    />
};

LocationsNavbar.propTypes = {
    locationSelected: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default LocationsNavbar;