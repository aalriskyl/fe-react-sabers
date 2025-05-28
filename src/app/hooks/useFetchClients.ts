/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import api from '../api/axios';

interface Client {
  id: string;
  name: string;
  company: string;
  logo: string;
  website: string | null;
  description: string | null;
  industry: string | null;
  created_at: string;
  updated_at: string;
}

const useFetchClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get<Client[]>('/api/clients');
      setClients(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to fetch clients');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, loading, error, refetch: fetchClients };
};

export default useFetchClients;
