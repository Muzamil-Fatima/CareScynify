import { useState, useCallback } from "react";
import {
  bookLabSample,
  getMyLabTestById,
} from "../../api/laboratory/bookLabTestApi";

const useLabBookTest = () => {
  const [loading, setLoading] = useState(false);

  const bookTest = useCallback(async (data) => {
    try {
      setLoading(true);

      const res = await bookLabSample(data);

      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookingById = useCallback(async (id) => {
    try {
      setLoading(true);

      const res = await getMyLabTestById(id);

      return res.sample;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    bookTest,
    fetchBookingById,
  };
};

export default useLabBookTest;
