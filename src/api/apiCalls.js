import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

export function useGetAPI(initialEndpoint, token = 'Not needed') {
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'X-Noroff-API-KEY': API_KEY,
      };

      if (token !== 'Not needed') {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, { headers });

      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData(endpoint);
    }
  }, [endpoint]); // Run fetchData when endpoint changes

  return { data, error, loading, setEndpoint };
}

export async function searchAPI(endpoint) {
  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.error(error);
  }
}

export function usePostAPI() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (endpoint, body, token = 'auth') => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token !== 'auth') {
        headers.Authorization = `Bearer ${token}`;
        if (typeof API_KEY !== 'undefined') {
          headers['X-Noroff-API-KEY'] = API_KEY;
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors[0].message || 'Failed to create booking',
        );
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
}

export function useLogin() {
  const [loginData, setData] = useState(null);
  const [loginError, setError] = useState(false);
  const [loginLoading, setLoading] = useState(false);

  const login = async (endpoint, body, token = 'auth') => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token !== 'auth') {
        headers.Authorization = `Bearer ${token}`;
        if (typeof API_KEY !== 'undefined') {
          headers['X-Noroff-API-KEY'] = API_KEY;
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loginData, loginError, loginLoading, login };
}

export function usePutAPI() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const putData = async (endpoint, body, token = 'auth') => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token !== 'auth') {
        headers.Authorization = `Bearer ${token}`;
        if (typeof API_KEY !== 'undefined') {
          headers['X-Noroff-API-KEY'] = API_KEY;
        }
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();
      console.log(body);
      console.log(API_KEY);
      console.log(token);
      setData(json);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, putData };
}

export function useDeleteAPI() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async (endpoint, token = 'auth') => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token !== 'auth') {
        headers.Authorization = `Bearer ${token}`;
        if (typeof API_KEY !== 'undefined') {
          headers['X-Noroff-API-KEY'] = API_KEY;
        }
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers,
      });

      if (response.status !== 204) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors[0].message || 'Failed to delete resource',
        );
      }

      setData(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, deleteData };
}
