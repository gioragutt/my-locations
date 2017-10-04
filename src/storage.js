const MY_LOCATIONS_CACHE_TOKEN = 'MyLocations Cache';

export const save = state => {
    const categories = state.categories.items;
    const locations = state.locations.items;
    const cache = { categories, locations };

    localStorage.setItem(MY_LOCATIONS_CACHE_TOKEN, JSON.stringify(cache));
};

export const load = () => {
    const cache = localStorage.getItem(MY_LOCATIONS_CACHE_TOKEN);
    if (!cache) {
        return {};
    }

    const { categories, locations } = JSON.parse(cache);

    return {
        categories, locations
    };
}