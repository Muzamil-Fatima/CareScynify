import React from "react";
import { FlaskConical, CheckCircle, Clock, Activity } from "lucide-react";
import useLabDashboard from "../../../hooks/laboratory/useLabDashboard";

const TestPerformance = () => {
  const { testPerformance } = useLabDashboard();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-xl">
          <FlaskConical className="text-purple-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Test Performance
          </h2>

          <p className="text-sm text-gray-500">
            Overview of laboratory test processing
          </p>
        </div>
      </div>


      {/* Test Cards */}

      <div className="space-y-5">

        {testPerformance?.length > 0 ? (

          testPerformance.map((test, index) => {

            const pending = test.total - test.completed;


            return (
              <div
                key={index}
                className="border border-gray-100 rounded-xl p-5 hover:bg-purple-50 transition"
              >

                <div className="flex justify-between items-center mb-4">

                  <h3 className="font-semibold text-gray-800">
                    {test._id}
                  </h3>


                  <span className="text-sm text-purple-600 font-semibold">
                    {test.total} Total
                  </span>

                </div>



                <div className="grid grid-cols-3 gap-4">


                  {/* Completed */}

                  <div className="flex items-center gap-2">

                    <CheckCircle 
                      size={18}
                      className="text-green-600"
                    />

                    <div>

                      <p className="text-xs text-gray-400">
                        Completed
                      </p>

                      <p className="font-bold text-gray-700">
                        {test.completed}
                      </p>

                    </div>

                  </div>




                  {/* Pending */}

                  <div className="flex items-center gap-2">

                    <Clock
                      size={18}
                      className="text-yellow-600"
                    />

                    <div>

                      <p className="text-xs text-gray-400">
                        Pending
                      </p>

                      <p className="font-bold text-gray-700">
                        {pending}
                      </p>

                    </div>

                  </div>




                  {/* Processing */}

                  <div className="flex items-center gap-2">

                    <Activity
                      size={18}
                      className="text-indigo-600"
                    />

                    <div>

                      <p className="text-xs text-gray-400">
                        Processing
                      </p>

                      <p className="font-bold text-gray-700">
                        0
                      </p>

                    </div>

                  </div>


                </div>



                {/* Progress */}

                <div className="mt-5">

                  <div className="flex justify-between text-xs text-gray-500 mb-2">

                    <span>
                      Completion Rate
                    </span>


                    <span>
                      {
                        test.total
                        ? Math.round(
                            (test.completed / test.total) * 100
                          )
                        : 0
                      }%
                    </span>

                  </div>



                  <div className="w-full bg-gray-200 rounded-full h-2">

                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width:`${
                          test.total
                          ? (test.completed / test.total) * 100
                          : 0
                        }%`
                      }}
                    />

                  </div>


                </div>


              </div>
            );
          })

        ) : (

          <p className="text-gray-500">
            No test performance available
          </p>

        )}

      </div>

    </div>
  );
};

export default TestPerformance;