import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetchTasks -> sendRequest로 변경. 좀 더 범용적인 느낌의 이름으로 변경했다. 
    const sendRequest = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method,
                headers: requestConfig.headers,
                body: JSON.stringify(requestConfig.body),
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);

            // const loadedTasks = [];

            // for (const taskKey in data) {
            //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            // }

            // setTasks(loadedTasks);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return ({
        isLoading,
        // isLoading: isLoading,        
        // key, value가 동일할 때는 축약해서 적을 수 있다. 알아서 인식한다. 
        error,
        // error: error,
        sendRequest,
        // sendRequest: sendRequest,
    });
};

export default useHttp;