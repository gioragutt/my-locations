const nameComparison = (first, second) => {
    const firstName = first.name.toLowerCase();
    const secondName = second.name.toLowerCase();
    if (firstName > secondName) {
        return 1;
    } else if (firstName < secondName) {
        return -1;
    }
    return 0;
}

const sortedByName = (locations) => { 
    return locations.slice().sort(nameComparison);
};

const splitByCategories = locations => {
    const groups = {};
    locations.forEach((loc, i) => {
        if (!(loc.category in groups)) {
            groups[loc.category] = [loc]
        } else {
            groups[loc.category].push(loc);
        }
    });
    return groups;
}

const sortByCategoryPredicate = (locations, predicate) => {
    const locationsByCategory = splitByCategories(locations);
    const categories = Object.keys(locationsByCategory);
    categories.sort((first, second) => predicate(first.toLowerCase(), second.toLowerCase()));
    const sortedLocations = Array.prototype.concat.apply([], categories.map(cat => locationsByCategory[cat]));
    return sortedLocations;
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