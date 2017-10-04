const sortedByName = (locations) => { 
    return locations.slice().sort(
        (first, second) => first.name.toLowerCase() > second.name.toLowerCase()
    );
};

const sortByCategoryPredicate = (locations, predicate) => {
    return sortedByName(locations).sort(
        (first, second) => predicate(first.category.toLowerCase(), second.category.toLowerCase())
    );
};

const sortedByCategory = (locations, sortMethod) => {
    switch (sortMethod) {
        case 'asc':
            return sortByCategoryPredicate(locations, (a, b) => a < b);
        case 'dsc':
            return sortByCategoryPredicate(locations, (a, b) => a > b);
        default:
            throw Error(`Reached sortByCategory when sort method is ${sortMethod}`);
    }
};

const filterLocations = (locations, categoryFilter) => {
    if (!categoryFilter) {
        return locations;
    }

    return locations.filter(loc => loc.category === categoryFilter);
};

const sortAndFilterLocations = (locations, sortMethod, categoryFilter) => {
    const filteredLocations = filterLocations(locations, categoryFilter);
    if (sortMethod) {
        return sortedByCategory(filteredLocations, sortMethod);
    }

    return sortedByName(filteredLocations);
};

export default sortAndFilterLocations;