import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/api.js";
import axios from "axios";
const AllAppointment = () => {
  const [appointment, setAppointment] = useState();
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/appointment/allAppointments`
        );
             console.log("Appointments Response:", res.data);
        setAppointment(res.data.data);
      } catch (error) {
        toast.error(
          "Error: " + (error.response?.data.message || error.message)
        );
      }
    };
    fetchAppointment();
  }, []);
  return (
    <>
      <p>Total Appointments: {appointment?.length || 0}</p>
    </>
  );
}
export default AllAppointment;