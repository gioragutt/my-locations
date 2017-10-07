import {
    LOCATIONS_ADD,
    LOCATIONS_EDIT,
    LOCATIONS_REMOVE,
    LOCATIONS_SELECT,
    LOCATIONS_INIT
} from '../actions/locations';

import {
    CATEGORIES_EDIT,
    CATEGORIES_REMOVE
} from '../actions/categories';

import * as uuid from 'uuid';

const INITIAL_STATE = {
    selected: null,
    items: []
};

const editLocation = (state, {oldLocationId, newLocation}) => {
    return {
        ...state,
        items: state.items.map(location => location.id !== oldLocationId ? location : newLocation)
    }
}

const deselectIfRemovedSelected = (selected, location) => {
    if (selected && selected.id === location.id) {
        return null;
    }

    return selected;
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

const updateCategoryNameChange = (state, {oldCategory, newCategory}) => {
    return {
        ...state,
        items: state.items.map(loc => {
            if (loc.category !== oldCategory) {
                return loc;
            }
            return {...loc, category: newCategory};
        })
    }
}

const invalidateLocationsRelatedToDeletedCategory = (state, category) => {
    return {
        ...state,
        items: state.items.map(loc => {
            if (loc.category !== category) {
                return loc;
            }
            return {...loc, category: null};
        })
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATIONS_INIT:
            return {
                ...state,
                items: action.payload
            };
        case LOCATIONS_ADD:
            return createNewLocation(state, action.payload);
        case LOCATIONS_EDIT:
            return editLocation(state, action.payload);
        case LOCATIONS_REMOVE:
            return {
                ...state,
                selected: deselectIfRemovedSelected(state.selected, action.payload),
                items: state.items.filter(location => location.id !== action.payload.id)
            };
        case LOCATIONS_SELECT:
            return {
                ...state,
                selected: validateSelectedExists(state, action.payload)
            }
        case CATEGORIES_EDIT:
            return updateCategoryNameChange(state, action.payload);
        case CATEGORIES_REMOVE:
            return invalidateLocationsRelatedToDeletedCategory(state, action.payload);
        default:
            return state;
    }
}