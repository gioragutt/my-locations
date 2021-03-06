export const LOCATIONS_ADD = 'LOCATIONS_ADD';
export const LOCATIONS_EDIT = 'LOCATIONS_EDIT';
export const LOCATIONS_REMOVE = 'LOCATIONS_REMOVE';
export const LOCATIONS_SELECT = 'LOCATIONS_SELECT';
export const LOCATIONS_INIT = 'LOCATIONS_INIT';

const locationAction = type => location => ({
    type,
    payload: location
});

export const initializeLocations = locationAction(LOCATIONS_INIT);

export const addLocation = locationAction(LOCATIONS_ADD);
export const selectLocation = locationAction(LOCATIONS_SELECT);
export const removeLocation = locationAction(LOCATIONS_REMOVE);
export const editLocation = (oldLocationId, newLocation) => ({
    type: LOCATIONS_EDIT,
    payload: {
        oldLocationId,
        newLocation
    }
});