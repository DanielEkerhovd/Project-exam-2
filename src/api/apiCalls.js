import { useState, useEffect } from "react";

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
            "X-Noroff-API-KEY": API_KEY,
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

export function usePostAPI(endpoint, body, token) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function postData() {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-KEY": API_KEY,
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
      postData();
    }
  }, [endpoint, body, token]);

  return { data, error, loading };
};

export function usePutAPI(endpoint, body, token) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function putData() {
      try {
        const response = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-KEY": API_KEY,
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
};

export function useDeleteAPI(endpoint, token) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function deleteData() {
      try {
        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-KEY": API_KEY,
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
      deleteData();
    }
  }, [endpoint, token]);

  return { data, error, loading };
};
