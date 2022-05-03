export const getAPIRoute = (baseURL, action, param = '') => {
    const allRoutes = {
        GET: '/api/products/',
        CREATE: '/api/products/create/',
        UPDATE: '/api/products/update/',
        DELETE: '/api/products/',
    };

    if (param) {
        return baseURL + allRoutes[action] + param;
    }

    return baseURL + allRoutes[action];
};
