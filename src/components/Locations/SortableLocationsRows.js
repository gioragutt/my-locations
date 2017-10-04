import React from 'react'

import LocationRows from './LocationRows';

const sortedByName = (locations) => 
    locations.slice().sort(
        (first, second) => first.name.toLowerCase() > second.name.toLowerCase()
    );

const sortByCategoryPredicate = (locations, predicate) =>
    sortedByName(locations).sort(
        (first, second) => predicate(first.category.toLowerCase(), second.category.toLowerCase())
    )

const sortedByCategory = (locations, sortMethod) => {
    switch (sortMethod) {
        case 'asc':
            return sortByCategoryPredicate(locations, (a, b) => a < b);
        case 'dsc':
            return sortByCategoryPredicate(locations, (a, b) => a > b);
        default:
            throw Error('Reached sortByCategory when sort method is unset');
    }
}

const filterLocations = (locations, categoryFilter) => {
    console.log('Category filter', categoryFilter)
    if (!categoryFilter) {
        return locations;
    }

    return locations.filter(loc => loc.category === categoryFilter);
}

const locationsAfterSortAndFilter = (locations, sortMethod, categoryFilter) => {
    const filteredLocations = filterLocations(locations, categoryFilter);
    if (sortMethod) {
        return sortedByCategory(filteredLocations, sortMethod);
    }
    return sortedByName(filteredLocations);
}

const SortableLocationRows =({locations, sortByCategory, categoryFilter, onClick, selectedLocation}) => {
    return (
        <LocationRows
            locations={locationsAfterSortAndFilter(locations, sortByCategory, categoryFilter)}
            selectedLocation={selectedLocation}
            onClick={onClick}
        />
    );
}

export default SortableLocationRows;