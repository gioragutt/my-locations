import React from 'react';
import Navbar from '../Navbar';

export default ({categorySelected, onAdd}) => {
    return <Navbar
        title="Categories"
        items={[
            {
                title: 'Add',
                onClick: onAdd,
            },
            {
                title: 'Edit',
                onClick: () => console.log('categories edit clicked'),
                disabled: !categorySelected
            },
            {
                title: 'Remove',
                onClick: () => console.log('categories remove clicked'),
                disabled: !categorySelected
            },
        ]}
    />
};
