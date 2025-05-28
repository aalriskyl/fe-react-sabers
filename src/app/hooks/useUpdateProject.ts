import { useState } from 'react';
import api from '../api/axios';
import axios from 'axios';

export const useUpdateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface ProjectFormData {
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
  budget?: string;
  location?: string;
  client_id?: string;
}

const updateProject = async (id: string, formData: ProjectFormData) => {
    try {
      setLoading(true);

      // Validate required fields
      if (!formData.title || !formData.description || !formData.start_date || !formData.status) {
        setError('All required fields must be filled.');
        setLoading(false);
        return;
      }

      // Create a FormData object for the request body
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('status', formData.status);
      formDataObj.append('start_date', formData.start_date);
      if (formData.end_date) formDataObj.append('end_date', formData.end_date);
      if (formData.budget) formDataObj.append('budget', formData.budget);
      if (formData.location) formDataObj.append('location', formData.location);

      // Construct query parameters for filtering
      const queryParams = new URLSearchParams();
      queryParams.append('budget', formData.budget || '');
      queryParams.append('title', formData.title);
      queryParams.append('description', formData.description);
      queryParams.append('start_date', formData.start_date);
      queryParams.append('status', formData.status);
      queryParams.append('end_date', formData.end_date || '');
      queryParams.append('client_id', formData.client_id || '');
      queryParams.append('location', formData.location || '');

      // Make the request with query parameters and form-data
      await api.put(`/api/projects/${id}?${queryParams.toString()}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Failed to update project');
      } else {
        setError('Failed to update project');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateProject };
};
