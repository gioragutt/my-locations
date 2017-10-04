export const CATEGORIES_ADD = 'CATEGORIES_ADD';
export const CATEGORIES_EDIT = 'CATEGORIES_EDIT';
export const CATEGORIES_REMOVE = 'CATEGORIES_REMOVE';
export const CATEGORIES_SELECT = 'CATEGORIES_SELECT';
export const CATEGORIES_INIT = 'CATEGORIES_INIT';
export const CATEGORIES_SET_FILTER = 'CATEGORIES_SET_FILTER';

const categoryAction = type => payload => ({
    type,
    payload: payload
});

export const initializeCategories = categoryAction(CATEGORIES_INIT);
export const setCategoryFilter = categoryAction(CATEGORIES_SET_FILTER);
export const resetCategoryFilter = () => setCategoryFilter('');

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