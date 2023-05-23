import { useState, useEffect } from 'react';

/**
 * Our API hook
 */
function useApi(url) {
    const [dataValues, setDataValues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setIsError(false);
                
                const fetchedData = await fetch(url);
                const json = await fetchedData.json();
                setDataValues(json);
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [url]);
    return { dataValues, isLoading, isError };
}

export default useApi;