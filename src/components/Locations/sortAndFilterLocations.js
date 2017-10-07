const sortedByName = (locations) => { 
    return locations.slice().sort(
        (first, second) => first.name.toLowerCase() > second.name.toLowerCase()
    );
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