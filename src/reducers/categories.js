import {
    CATEGORIES_ADD,
    CATEGORIES_EDIT,
    CATEGORIES_REMOVE,
    CATEGORIES_SELECT,
    CATEGORIES_INIT,
    CATEGORIES_SET_FILTER
} from '../actions/categories';

const INITIAL_STATE = {
    selected: '',
    filter: '',
    items: []
};

const editCategory = (state, {oldCategory, newCategory}) => {
    return {
        ...state,
        items: state.items.map(category => category !== oldCategory ? category : newCategory)
    }
}

const categoryExists = (state, category) => state.items.includes(category);

const validateSelectedExists = (state, selected) => {
    return categoryExists(state, selected) ? selected : ''
;}

const addCategory = (state, category) => {
    if (categoryExists(state, category)) {
        return state;
    }

    return {
        ...state,
        items: [...state.items, category]
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIES_INIT:
            return {
                ...state,
                items: action.payload
            };
        case CATEGORIES_ADD:
            return addCategory(state, action.payload);
        case CATEGORIES_EDIT:
            return editCategory(state, action.payload);
        case CATEGORIES_REMOVE:
            return {
                ...state,
                filter: state.filter === action.payload ? '' : state.filter,
                items: state.items.filter(category => category !== action.payload)
            };
        case CATEGORIES_SELECT:
            return {
                ...state,
                selected: validateSelectedExists(state, action.payload)
            }
        case CATEGORIES_SET_FILTER:
            return {
                ...state,
                filter: action.payload || ''
            }
        default:
            return state;
    }
}