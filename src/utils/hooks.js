import { useEffect, useState } from 'react';

export const useFetch = (url, headers) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });

            if (response.status !== 200) {
                throw new Error('Product not found');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading && url) {
            fetchData();
        }
    }, [url]);

    return [setData, data, loading, error];
};
