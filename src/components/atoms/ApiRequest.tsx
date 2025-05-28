import React, { useEffect, useState } from 'react';
import axios, { Method } from 'axios';

interface ApiRequestProps {
  method: Method;
  url: string;
  data?: unknown;
  onSuccess: (response: unknown) => void;
  onError: (error: unknown) => void;
}

const ApiRequest: React.FC<ApiRequestProps> = ({ method, url, data, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({ method, url, data });
        onSuccess(response.data);
      } catch (error) {
        onError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [method, url, data, onSuccess, onError]);

  return loading ? <p>Loading...</p> : null;
};

export default ApiRequest;
