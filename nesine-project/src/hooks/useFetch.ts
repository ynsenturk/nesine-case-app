import axios from 'axios';
import { MutableRefObject, useEffect, useState } from 'react';

export const useFetch = (
  url: string,
  ref: MutableRefObject<boolean>,
  initialValue = []
) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          const res = await axios.get(url)
          const data = await res.data;
          setData(data);
        } catch (error) {
          setError(error as string);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => {
      ref.current = false;
    };
  }, [url, ref]);

  return { loading, error, data };
};