export const CATEGORIES_ADD = 'CATEGORIES_ADD';
export const CATEGORIES_EDIT = 'CATEGORIES_EDIT';
export const CATEGORIES_REMOVE = 'CATEGORIES_REMOVE';
export const CATEGORIES_SELECT = 'CATEGORIES_SELECT';
export const CATEGORIES_INIT = 'CATEGORIES_INIT';

const categoryAction = type => category => ({
    type,
    payload: category
});

export const initializeCategories = categoryAction(CATEGORIES_INIT);

export const addCategory = categoryAction(CATEGORIES_ADD);
export const selectCategory = categoryAction(CATEGORIES_SELECT);
export const removeCategory = categoryAction(CATEGORIES_REMOVE);
export const editCategory = (oldCategory, newCategory) => ({
    type: CATEGORIES_EDIT,
    payload: {
        oldCategory,
        newCategory
    }
});