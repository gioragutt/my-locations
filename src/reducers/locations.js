import {
    LOCATIONS_ADD,
    LOCATIONS_EDIT,
    LOCATIONS_REMOVE,
    LOCATIONS_SELECT
} from '../actions/locations';

import * as uuid from 'uuid';

import Location from '../models/location';

const INITIAL_STATE = {
    selected: null,
    items: [
        new Location(uuid(), 'Location1', 'Address1', {lat: 33, long: 33}, 'cat1'),
        new Location(uuid(), 'Location2', 'Address2', {lat: 33, long: 34}, 'cat2'),
    ]
};

const editLocation = (state, {oldLocationId, newLocation}) => {
    return {
        ...state,
        items: state.items.map(location => location.id !== oldLocationId ? location : newLocation)
    }
}

const validateSelectedExists = (state, selected) => {
    if (selected === null) {
        return null;
    }

    const locationExists = state.items.find(item => item.id === selected.id) !== undefined;
    return locationExists ? selected : null
;}

const createNewLocation = (state, location) => {
    const newLocation = {...location, id: uuid()}
    return {
        ...state,
        items: [...state.items, newLocation]
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATIONS_ADD:
            return createNewLocation(state, action.payload);
        case LOCATIONS_EDIT:
            return editLocation(state, action.payload);
        case LOCATIONS_REMOVE:
            return {
                ...state,
                items: state.items.filter(location => location !== action.payload)
            };
        case LOCATIONS_SELECT:
            return {
                ...state,
                selected: validateSelectedExists(state, action.payload)
            }
        default:
            return state;
    }
}