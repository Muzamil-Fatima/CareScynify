import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LabTestHeader from "../../components/laboratory/labTestDetail/LabTestHeader";
import LabTestDescription from "../../components/laboratory/labTestDetail/LabTestDescription";
import LabInfoCard from "../../components/laboratory/labTestDetail/LabInfoCard";
import BookLabTest from "../../components/laboratory/labTestDetail/BookLabTest";

import useLabTest from "../../hooks/laboratory/useLabTest";

const LabTestDetail = () => {
  const { id } = useParams();

  const { fetchLabTestById } = useLabTest();

  const [labtest, setLabTest] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

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
        <LabTestHeader labtest={labtest} onBook={() => setShowBooking(true)} />

        {/* Description */}
        <LabTestDescription labtest={labtest} />

        {/* Laboratory Information */}
        <LabInfoCard laboratory={labtest.laboratoryId} />
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookLabTest
          labtest={labtest}
          laboratory={labtest.laboratoryId}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};

export default LabTestDetail;
