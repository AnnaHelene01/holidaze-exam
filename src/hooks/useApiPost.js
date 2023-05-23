import {useState} from 'react';

function useApiPost() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function postData(url, payload) {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setData(null);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
        
    return {data, isLoading, isError, postData};
}

export default useApiPost;