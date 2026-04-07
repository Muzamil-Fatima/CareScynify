import DrConsultation from "./DrConsultation";
const DrAppointmentDetails = ({ drForm, setDrForm }) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Appointment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Available Days</label>

            <div className="grid grid-cols-4 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={day}
                    checked={drForm.availableDays?.includes(day) || false}
                    onChange={(e) => {
                      const { checked } = e.target;
                      let newDays = drForm.availableDays
                        ? [...drForm.availableDays]
                        : [];
                      if (checked) newDays.push(day);
                      else newDays = newDays.filter((d) => d !== day);
                      setDrForm({ ...drForm, availableDays: newDays });
                    }}
                    className="accent-blue-500"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>
          <DrConsultation drForm={drForm} setDrForm={setDrForm} />
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Room No.</label>
            <input
              value={drForm.drRoomNo}
              onChange={(e) => {
                setDrForm({ ...drForm, drRoomNo: e.target.value });
              }}
              type="text"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Appointment Duration</label>

            <div className="flex gap-2">
              {/* Number input */}
              <input
                value={drForm.duration}
                onChange={(e) => {
                  setDrForm({ ...drForm, duration: e.target.value });
                }}
                type="number"
                min="1"
                placeholder="Enter value"
                className="border border-gray-300 rounded-lg p-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Unit select */}
              <select
                value={drForm.durationUnit || "minutes"}
                onChange={(e) =>
                  setDrForm({ ...drForm, durationUnit: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">Status</label>
            <select
              value={drForm.status || "Active"}
              onChange={(e) => setDrForm({ ...drForm, status: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2 text-gray-700">
              Note
            </label>
            <textarea
              value={drForm.note}
              onChange={(e) => {
                setDrForm({ ...drForm, note: e.target.value });
              }}
              name=""
              id=""
              placeholder="Enter a short note for patients"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrAppointmentDetails;
