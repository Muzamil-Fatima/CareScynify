 import {toast} from "react-hot-toast";
 // GENERIC HELPER
 export const updateDoctorModule = async (key, apiCall, updatedArray, successMsg, setProfile) => {
    try {
      const res = await apiCall({ [key]: updatedArray });

      if (res?.success) {
        setProfile((prev) => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            [key]: updatedArray,
          },
        }));

        toast.success(successMsg);
        return true;
      }

      toast.error(res?.message || "Operation failed");
      return false;
    } catch (err) {
      console.error("Module update error:", err);
      toast.error("Server error");
      return false;
    }
  };