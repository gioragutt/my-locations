import PropTypes from 'prop-types'

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

export const CategoriesListPropType = PropTypes.arrayOf(PropTypes.string).isRequired;
export const SortByCategoryPropType = PropTypes.oneOf(['asc', 'dsc', null]);
export const CoordinatesPropTypes = PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired
});

export const LocationPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    coordinates: CoordinatesPropTypes.isRequired,
    category: PropTypes.string
});