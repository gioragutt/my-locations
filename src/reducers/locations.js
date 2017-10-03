import {
    CATEGORIES_ADD,
    CATEGORIES_EDIT,
    CATEGORIES_REMOVE,
    CATEGORIES_SELECT
} from '../actions/categories';

const INITIAL_STATE = {
    selected: '',
    items: [
        'cat1',
        'cat2'
    ]
};

const editCategory = (state, {oldCategory, newCategory}) => {
    return {
        ...state,
        items: state.items.map(category => category !== oldCategory ? category : newCategory)
    }
}

const validateSelectedExists = (state, selected) => {
    return state.items.includes(selected) ? selected : ''
;}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES_ADD:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case CATEGORIES_EDIT:
            return editCategory(state, action.payload);
        case CATEGORIES_REMOVE:
            return {
                ...state,
                items: state.items.filter(category => category !== action.payload)
            };
        case CATEGORIES_SELECT:
            return {
                ...state,
                selected: validateSelectedExists(state, action.payload)
            }
        default:
            return state;
    }
}