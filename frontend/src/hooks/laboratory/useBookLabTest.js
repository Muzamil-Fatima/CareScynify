import { useState } from "react";
import { bookLabSample } from "../../api/laboratory/bookLabTestApi";

const useLabBookTest = () => {
  const [loading, setLoading] = useState(false);

  const bookTest = async (data) => {
    try {
      setLoading(true);

      const res = await bookLabSample(data);

      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    bookTest,
  };
};

export default useLabBookTest;