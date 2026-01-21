import { useState } from "react";

const useFetch = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | T>(null);
  const getData = async (url: string) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      console.log(url)
    } catch (error) {
      throw new Error("Error fetching products data");
    } finally {
      setLoading(false);
    }
  };
  return { loading, data, getData };
};

export default useFetch;
