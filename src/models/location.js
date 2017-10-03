const isNumberInRange = (min, max) => value => {
    try {
        const number = Number.parseFloat(value);
        return number >= min && number <= max;
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

export default class Location {
    constructor(id, name, address, {lat, long}, category) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinates = {lat, long};
        this.category = category;
    }
}