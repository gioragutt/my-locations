export { default as sortAndFilterLocations } from './sortAndFilterLocations';

export const toggleSortByCategory = (sortByCategory) => {
    switch (sortByCategory) {
        case null:
            return 'asc';
        case 'asc':
            return 'dsc';
        case 'dsc':
        default:
            return null;
    }
};