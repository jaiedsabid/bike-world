export const getAPIRoute = (baseURL, action, param = '') => {
    const allRoutes = {
        GET: '/api/products/',
        CREATE: '/api/products/create/',
        UPDATE: '/api/products/update/',
        DELETE: '/api/products/delete/',
        LOGIN: '/api/user/login/',
    };

    if (param) {
        return baseURL + allRoutes[action] + param;
    }

    return baseURL + allRoutes[action];
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const inputFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
    },
    {
        name: 'price',
        label: 'Price',
        type: 'number',
        placeholder: 'Enter price',
    },
    {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Enter description',
    },
    {
        name: 'supplier',
        label: 'Supplier',
        type: 'text',
        placeholder: 'Enter supplier',
    },
    {
        name: 'imageSrc',
        label: 'Image',
        type: 'text',
        placeholder: 'Enter image URL',
    },
    {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        placeholder: 'Enter quantity',
    },
];
