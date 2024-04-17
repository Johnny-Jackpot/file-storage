import {useEffect, useState} from "react";

export default function useLoadLib(): {loaded: boolean, error: boolean} {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      setLoaded(true);
    };
    script.onerror = () => {
      setError(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return {loaded, error};
}
