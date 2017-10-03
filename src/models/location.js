export const isLocationValid = (location, availableCategories) => 
    location.name.length > 0 &&
    location.address.length > 0 &&
    availableCategories.includes(location.category) &&
    Number.isFinite(location.coordinates.lat) &&
    Number.isFinite(location.coordinates.long);

export default class Location {
    constructor(id, name, address, {lat, long}, category) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinates = {lat, long};
        this.category = category;
    }
}