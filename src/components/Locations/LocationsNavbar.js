import React from 'react';
import Navbar from '../Navbar';

const LocationsNavbar = ({locationSelected, onAdd, onRemove, onEdit}) => {
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

export default LocationsNavbar;