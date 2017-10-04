import { GOOGLE_MAPS_API_KEY } from '../../constants';

const addressByLatLngUrl = (lat, lng) => {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
}

export const addressByCoordinates = ({lat, long}) => {
    return fetch(addressByLatLngUrl(lat, long))
        .then(res => res.json())
        .then(res => {
            const { results } = res;
            if (results.length > 0) {
                return results[0].formatted_address;
            }
            return null;
        });
}