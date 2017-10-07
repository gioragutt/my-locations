import is from '@sindresorhus/is';

const isNumberInRange = (min, max) => value => {
    try {
        const number = Number.parseFloat(value);
        return is.inRange(number, [min, max]);
    } catch(e) {
        return false;
    }
}

export const isLatitudeValid = isNumberInRange(-90, 90);
export const isLongitudeValid = isNumberInRange(-180, 180);

export const isLocationValid = (location, availableCategories) => 
    location.name.length > 0 &&
    location.address.length > 0 &&
    availableCategories.includes(location.category) &&
    isLatitudeValid(location.coordinates.lat) &&
    isLongitudeValid(location.coordinates.long);