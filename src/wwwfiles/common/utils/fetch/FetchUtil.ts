import { useEffect, useState } from 'react';

class FetchUtil {
  fetchTableData = async <T>(endpoint: string, teamId: number): Promise<T> => {
    const url = `https://8jbh3h0zi0.execute-api.eu-central-1.amazonaws.com/vbcunibern-api/${endpoint}?teamid=${teamId}`;

    const headers = {
      'Content-Type': 'application/json'
    }

    const rankingsData = await fetch(url, {
      headers
    });

    const rankings = await rankingsData.json() as T;
    return rankings;
  }
}

export const useFetch = <T>(endpoint: string, teamId: number): [boolean, T, boolean] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({} as T);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `https://8jbh3h0zi0.execute-api.eu-central-1.amazonaws.com/vbcunibern-api/${endpoint}?teamid=${teamId}`;

    const headers = {
      'Content-Type': 'application/json'
    }

    const fetchData = async () => {
      try {
        const data = await fetch(url, {
          headers
        });
        const json = await data.json() as T;
        setData(json);
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    }

    fetchData();
  }, [])

  return [loading, data, error]
} 

export default new FetchUtil();
