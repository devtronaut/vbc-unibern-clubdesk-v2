import { useState, useEffect } from 'react';

export const useTablesApi = <T,>(
  endpoint: string,
  teamId: number
): [boolean, T, boolean] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({} as T);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `https://8jbh3h0zi0.execute-api.eu-central-1.amazonaws.com/vbcunibern-api/${endpoint}?teamid=${teamId}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const fetchData = async () => {
      try {
        const data = await fetch(url, {
          headers,
        });
        const json = (await data.json()) as T;
        setData(json);
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return [loading, data, error];
};
