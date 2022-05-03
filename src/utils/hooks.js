import { useEffect, useState } from 'react';

export const useFetch = (url) => {
    const [stateValue, setStateValue] = useState({
        data: null,
        isLoading: true,
        isError: false,
        errorMsg: '',
    });

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Product not found');
            }

            const data = await response.json();
            setStateValue({
                ...stateValue,
                data,
                isLoading: false,
            });
        } catch (error) {
            setStateValue({
                ...stateValue,
                isLoading: false,
                isError: true,
                errorMsg: error.message,
            });
        }
    };

    useEffect(() => {
        if (stateValue.isLoading && url) {
            fetchData();
        }
    }, [url]);

    return [setStateValue, ...Object.values(stateValue)];
};
