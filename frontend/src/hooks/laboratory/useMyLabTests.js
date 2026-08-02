import { useState, useCallback } from "react";
import { getMyLabTests } from "../../api/laboratory/bookLabTestApi";

const useMyLabTests = () => {
  const [loading, setLoading] = useState(false);
  const [myLabTests, setMyLabTests] = useState([]);

  const fetchMyLabTests = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getMyLabTests();

      setMyLabTests(res.samples || []);

      return res;
    } catch (error) {
      console.error("Failed to fetch lab tests:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    myLabTests,
    fetchMyLabTests,
  };
};

export default useMyLabTests;