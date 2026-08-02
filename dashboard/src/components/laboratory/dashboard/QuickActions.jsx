import React from "react";
import { Plus, Users, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {

  const navigate = useNavigate();


  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="font-bold text-xl mb-5">
        Quick Actions
      </h2>


      <div className="grid grid-cols-3 gap-4">

        <button
          onClick={() => navigate("/lab/samples")}
          className="p-4 rounded-xl bg-purple-50 text-purple-700"
        >
          <Plus className="mx-auto" />
          <p className="text-sm mt-2">
            New Sample
          </p>
        </button>


        <button
          onClick={() => navigate("/lab/patients")}
          className="p-4 rounded-xl bg-blue-50 text-blue-700"
        >
          <Users className="mx-auto" />
          <p className="text-sm mt-2">
            Patients
          </p>
        </button>


        <button
          onClick={() => navigate("/lab/tests")}
          className="p-4 rounded-xl bg-green-50 text-green-700"
        >
          <FlaskConical className="mx-auto" />
          <p className="text-sm mt-2">
            Tests
          </p>
        </button>


      </div>

    </div>
  );
};

export default QuickActions;