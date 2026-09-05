import { useState, useEffect } from "react";

function useGetApi(url) {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoad(true);
    setError("");
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Произошла ошибка запроса");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, load, error };
}
export default useGetApi;


