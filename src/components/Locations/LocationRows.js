import React from 'react'

const Row = ({location, isSelected, onClick}) => (
    <tr className={isSelected ? 'bg-primary' : ''}
        onClick={() => onClick(location)}
    >
        <td>{location.name}</td>
        <td>{location.address}</td>
        <td>{location.category}</td>
        <td>{location.coordinates.lat}</td>
        <td>{location.coordinates.long}</td>
    </tr>
);

const LocationRows = ({locations, selectedLocation, onClick}) => locations.map(loc => (
    <Row
        key={loc.id}
        location={loc}
        isSelected={!!selectedLocation ? loc.id === selectedLocation.id : false}
        onClick={onClick}
    />
));

export default LocationRows;