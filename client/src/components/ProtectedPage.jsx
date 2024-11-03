import  { useEffect, useState } from 'react';
import api from '../api/authApi';

const ProtectedData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/protected');
                setData(response.data); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Protected Data</h1>
            {data ? (
                <div>
                    <p>{JSON.stringify(data)}</p> 
                </div>
            ) : (
                <p>Loading data ...</p>
            )}
        </div>
    );
};

export default ProtectedData;
