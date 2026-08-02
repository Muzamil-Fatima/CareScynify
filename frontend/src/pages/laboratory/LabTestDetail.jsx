import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LabTestHeader from "../../components/laboratory/labTestDetail/LabTestHeader";
import LabTestDescription from "../../components/laboratory/labTestDetail/LabTestDescription";
import LabInfoCard from "../../components/laboratory/labTestDetail/LabInfoCard";

import useLabTest from "../../hooks/laboratory/useLabTest";
import useLabBookTest from "../../hooks/laboratory/useBookLabTest";
const LabTestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchLabTestById } = useLabTest();

  const [labtest, setLabTest] = useState(null);
  const { loading, bookTest } = useLabBookTest();

  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;

      try {
        const data = await fetchLabTestById(id);

        setLabTest(data);
      } catch (error) {
        console.log("Lab Test Detail Error:", error);
      }
    };

    fetchTest();
  }, [id, fetchLabTestById]);

  const handleBookTest = async (test) => {
    if (loading) return;

    try {
      const res = await bookTest({
        laboratoryId:
          typeof test.laboratoryId === "object"
            ? test.laboratoryId._id
            : test.laboratoryId,
        testId: test._id,
        priority: "Normal",
      });

      if (res.success) {
        navigate(`/test-book-success/${res.sample._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!labtest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading Test Details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Test Header */}
        <LabTestHeader labtest={labtest} onBook={handleBookTest} />

        {/* Description */}
        <LabTestDescription labtest={labtest} />

        {/* Laboratory Information */}
        <LabInfoCard laboratory={labtest.laboratoryId} />
      </div>
    </div>
  );
};

export default LabTestDetail;
