export const CATEGORIES_ADD = 'CATEGORIES_ADD';
export const CATEGORIES_EDIT = 'CATEGORIES_EDIT';
export const CATEGORIES_REMOVE = 'CATEGORIES_REMOVE';
export const CATEGORIES_SELECT = 'CATEGORIES_SELECT';

const categoryAction = type => category => {
    console.log(`${type} called with ${category}`);
        return ({
        type,
        payload: category
    })
};

export const addCategory = categoryAction(CATEGORIES_ADD);
export const selectCategory = categoryAction(CATEGORIES_SELECT);