import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

export function useGetAPI(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'X-Noroff-API-KEY': API_KEY,
          },
        });

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
    }

    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return { data, error, loading };
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

export function usePutAPI(endpoint, body, token) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function putData() {
      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-KEY': API_KEY,
          },
          body: JSON.stringify(body),
        });

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
    }

    if (endpoint) {
      putData();
    }
  }, [endpoint, body, token]);

  return { data, error, loading };
}

export function useDeleteAPI(endpoint, token) {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function deleteData() {
      try {
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-KEY': API_KEY,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (endpoint) {
      deleteData();
    }
  }, [endpoint, token]);

  return { data, error, loading };
}
