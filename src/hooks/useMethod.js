import {useState} from 'react';

function useMethod() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    async function postInfo(url, payload) {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        });
    
        if (response.status >= 200 && response.status < 300) {
          const json = await response.json();
          setData(json);
        } else {
          const error = await response.json();
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    return {data, isLoading, isError, postInfo};
}

export default useMethod;