import { useState } from 'react';

function useApiPut() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    async function putData( url, payload ) {
        try {
            setIsLoading(true);
            setIsError(false);
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            }); 
            //console.log("Response: ", response);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, isError, putData };
}

export default useApiPut;